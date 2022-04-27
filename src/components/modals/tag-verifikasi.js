import React from "react";
import '../../index.css';

import {
    Button,
} from 'react-bootstrap';

const TagVerifikasi = (props) => {
    const { status } = props;

    return (
        <div>
        { status == 1
        ? <Button className="rounded-pill ms-auto mb-auto" variant="success">Sudah Diverifikasi</Button>
        : status == 2
        ? <Button className="rounded-pill ms-auto mb-auto" variant="danger">Verifikasi Ditolak</Button>
        : <Button className="rounded-pill ms-auto mb-auto" variant="warning">Belum Diverifikasi</Button>
        }
        </div>
    );
};

export default TagVerifikasi;

