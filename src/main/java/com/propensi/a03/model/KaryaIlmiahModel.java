package com.propensi.a03.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "karya_ilmiah")
public class KaryaIlmiahModel implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idKaryaIlmiah;

    @NotNull
    @Size(max = 250)
    @Column(name = "authors", nullable = false)
    private String authors;

    @ManyToOne()
    @JoinColumn(name = "id_user", referencedColumnName = "id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private UserModel userPengunggah;

    @NotNull
    @Size(max = 350)
    @Column(name = "judul", nullable = false)
    private String judul;

    @NotNull
    @Column(name = "status", nullable = false)
    private int status;

    @NotNull
    @Size(max = 350)
    @Column(name = "jenis", nullable = false)
    private String jenis;

    @NotNull
    @Column(name = "abstrak", nullable = false)
    private String abstrak;

    @ManyToOne()
    @JoinColumn(name = "username_pembimbing", referencedColumnName = "username")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private UserModel dosenPembimbing;

    @ManyToOne()
    @JoinColumn(name = "username_verifikator", referencedColumnName = "username")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private UserModel verifikator;

    @NotNull
    @Column(nullable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate tglVerifikasi;

    @ManyToMany
    @JoinTable(
            name = "karyaIlmiah_kategori",
            joinColumns = @JoinColumn(name = "id_karya_ilmiah"),
            inverseJoinColumns = @JoinColumn(name = "id_kategori"))
    List<KategoriModel> listKategori;

    @ManyToMany
    @JoinTable(
            name = "daftar_pengunduh",
            joinColumns = @JoinColumn(name = "id_karya_ilmiah"),
            inverseJoinColumns = @JoinColumn(name = "id"))
    List<UserModel> daftarPengunduh;

    @ManyToMany(mappedBy = "listKaryailmiahFavorit")
    List<UserModel> listFavoritByUser;
}
