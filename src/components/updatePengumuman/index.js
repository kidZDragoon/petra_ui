import React, {Component} from "react";
import FormPengumuman from "../formPengumuman"
import axios from "axios";
import AuthenticationDataService from "../../services/authentication.service";

export default class UpdatePengumuman extends Component{
    constructor(props) {
        super(props);
        this.state = {
            judul:"",
            tglDibuat:Date,
            pesan:"",
            id:"",
            role:"",
        }
    }

    componentDidMount() {
        this.loadUser()
        const pathname = window.location.href.split("/update-pengumuman/")[1];
        console.log(this.state.role)
        this.handleDetailPengumuman(pathname);
    }

    async handleDetailPengumuman(item,event){
        // event.preventDefault()
        try{
            console.log(item)
            const {data}= await axios.get("/api/pengumuman/"+ item);
            console.log(data)
            this.setState({judul: data.data.judul, tglDibuat: data.data.tglDibuat, pesan: data.data.isiPengumuman,
            id: data.data.id}) //tglDibuat == tglDisunting
            console.log("sebelum masuk props")
            console.log(this.state.judul)
            console.log(this.state.pesan)
           
        }catch(error){
            alert("Oops terjadi masalah pada server")

        }
    }

    async loadUser(){
        try {
            let token = localStorage.getItem("ssoui");
            console.log(token);
            token = JSON.parse(token);
            console.log(token);
            if (token !== null){
                const response = await AuthenticationDataService.profile(token);
                console.log(response);
                console.log(response.data.role);
                this.setState({role:response.data.role});
            }

        } catch {
            console.log("Load user error!");
        }
    }

    render(){
        return(
            <div>
                {this.state.role === "staf"?
                <FormPengumuman judul={this.state.judul} pesan={this.state.pesan} id={this.state.id}
                tglDibuat={this.state.tglDibuat}/>:
                <div></div>
                }
            
            </div>
           
        )
    }
}