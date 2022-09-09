import React from 'react';

class NotesArchive extends React.Component {
  
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
		  <div>
			  <p style={{marginBottom: 10}}><b>Arsip</b></p>
        <div className="notes">
        {
          this.props.NotesData.map(function(item, i){
            if(item.isActive==false){
              const d = new Date(item.id);
              const e = ("0"+d.getDate()).slice(-2)+"/"+("0"+(d.getMonth()+1)).slice(-2)+"/"+d.getFullYear()+" "+("0"+d.getHours()).slice(-2)+":"+("0"+d.getMinutes()).slice(-2);
              return (
                <div id="{item.id}" key={i} className="form-control" style={{padding:10}}>
                  <div className="row">
                    <div>
                      <h3 className="judul">{item.title}</h3>
                      <p className="tanggal"><i>{e}</i></p>
                    </div>
                    <div className="mt-auto ml-auto">
                      <button className="form-control btn-success" onClick={e=>this.handleEdit(item.id,true)}><p className="wmc">Pindahkan</p></button>
                      <button className="form-control btn-danger" onClick={e=>this.handleDelete(item.id)}><p>Hapus</p></button>
                    </div>
                  </div>
                  <p className="catatan my-auto">{item.note}</p>
                </div>
              )
            }
          }, this)
        }
        </div>
		  </div>
   );
 }
}
 
export default NotesArchive;