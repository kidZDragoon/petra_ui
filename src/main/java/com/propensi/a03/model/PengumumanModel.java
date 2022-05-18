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

import java.time.LocalDate;
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
@Table(name = "pengumuman")
public class PengumumanModel implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idPengumuman;

    @NotNull
    @Size(max = 250)
    @Column(name = "judul", nullable = false)
    private String judul;

    @ManyToOne()
    @JoinColumn(name = "username", referencedColumnName = "username")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private UserModel stafPembuat;

    @NotNull
    @Column(nullable = false)
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDate tanggalDibuat;

    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDate tanggalDisunting;

    @NotNull
    @Column(name = "isi_pengumuman", nullable = false)
    private String isiPengumuman;

}
