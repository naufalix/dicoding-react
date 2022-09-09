import React from 'react';
import {showFormattedDate} from '../utils/index';

class NotesList extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    }
  }

  handleEdit(id,val) {
    this.props.onEdit(id,val);
  }

  handleDelete(id) {
    this.props.onDelete(id);
  }

  render() {
    return (
        <div className="notes">
        {
          this.props.NotesData.map(function(item, i){
            if(item.archived==this.props.archived&&item.title.toLowerCase().includes(this.props.keyword.toLowerCase())){
              const d = new Date(item.createdAt);
              //const e = ("0"+d.getDate()).slice(-2)+"/"+("0"+(d.getMonth()+1)).slice(-2)+"/"+d.getFullYear()+" "+("0"+d.getHours()).slice(-2)+":"+("0"+d.getMinutes()).slice(-2);
              const e = showFormattedDate(d)
              return (
                <div key={i} className="form-control" style={{padding:10}}>
                  <div className="row">
                    <div>
                      <h3 className="judul">{item.title}</h3>
                      <p className="tanggal"><i>{e}</i></p>
                    </div>
                    <div className="mt-auto ml-auto">
                      <button className="form-control btn-success" onClick={e=>this.handleEdit(item.id,!this.props.archived)}><p className="">{this.props.archived ? "Pindahkan" : "Arsipkan"}</p></button>
                      <button className="form-control btn-danger" onClick={e=>this.handleDelete(item.id)}><p>Hapus</p></button>
                    </div>
                  </div>
                  <p className="catatan my-auto">{item.body}</p>
                </div>
              )
            }
          }, this)
        }
        {
          this.props.NotesData.filter(nt => nt.archived == this.props.archived).length==0
          ? <p>Tidak ada catatan</p> : <></>
        }
        </div>
   );
 }
}
 
export default NotesList;