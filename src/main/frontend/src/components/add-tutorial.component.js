import React, {Component} from "react";
import TutorialDataService from "../services/tutorial.service";

export default class AddTutorial extends Component {
    constructor(props) {
        super(props);
        // bind fungsi2 dibawah constructor agar
        // react tau fungsi x dari class AddTutorial
        // kalo ga dibind ga work

        /*
        Selain itu, ada juga bikin state di constructor

        Fungsinya untuk bikin semacam variabel yang melekat dalam
        satu class

        Bedanya di react bukan class, melainkan component
         */

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveTutorial = this.saveTutorial.bind(this);
        this.newTutorial = this.newTutorial.bind(this);
        this.state = {
            id: null,
            title: "",
            description: "",
            published: false,
            submitted: false
        };
    }

    /*
    Untuk bikin form wajib bikin fungsi onChange, memanfaatkan
    variabel onChange yang ada pada <input /> di html

    Untuk nilainya sendiri ya tetap disimpan dalam variabel
    value, yg di assign dengan nilai dari state

    Component merupakan tipe stateful, yang artinya memiliki state
    (variabel dalam component)
     */
    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    saveTutorial() {
        var data = {
            title: this.state.title,
            description: this.state.description
        };

        /*
        Data yang didapat dari state componentnya AddTutorial
        ditembak ke API melalui metode POST (cek tutorial.service.js)
        menggunakan service TutorialDataService

        Untuk fungsi .create(), parameter fungsinya meminta data
        yaitu state title dan description

        .then() setelah .create() opsional saja untuk dapetin
        response dari API apakah sudah berhasil ditambahkan ke
        database atau tidak. State diubah nilainya berdasarkan response
        yang diterima kemudian di print dalam console web

        .catch() setelahnya digunakan untuk menangkap error (?)
        seperti try catch dalam java (exception handler)

         */

        TutorialDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    published: response.data.published,
                    submitted: true
                });

                console.log(response.data);
            })

            .catch(e => {
                console.log(e);
            })
    }

    /*
    Setelah submisi membuat tutorialnya selesai disubmisi,
    nilai state pada component perlu di reset sehingga
    bisa menambahkan tutorial baru. Untuk resetnya, dibutuhkan
    fungsi newTutorial()
     */
    newTutorial() {
        this.setState({
            id: null,
            title: "",
            description: "",
            published: false,
            submitted: false
        })
    }

    render() {
        return(
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newTutorial}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>

                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                name="title"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">
                                Description
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                name="description"
                            />
                        </div>

                        <button onClick={this.saveTutorial}
                                className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );

    }
}