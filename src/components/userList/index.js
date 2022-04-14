import React, {Component} from "react";
import classes from "./styles.module.css";

export default class UserList extends Component {
    render (){
        return (
            <div className="container" id={classes["container"]}>
                <table className="table table-borderless">
                    <thead>
                    <tr className="d-flex" id={classes["tabelHeader"]}>
                        <th className="col-1">No</th>
                        <th className="col-3">Nama Lengkap</th>
                        <th className="col-3">Email</th>
                        <th className="col-2">Role</th>
                        <th className="col-1"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="d-flex">
                        <td className="col-1">1</td>
                        <td className="col-3">haidfnoiasf poa noiasdnoi</td> 
                        <td className="col-3">sdfniusa@haisdfm.com</td>
                        <td className="col-2">mahasiswa</td>
                    
                        <td className="col-1">
                            <button  id={classes["features"]} href="#">Update Role</button>
                        </td>
                     
                    </tr>
                    </tbody>

                </table>
                
            </div>
        )
    }
}