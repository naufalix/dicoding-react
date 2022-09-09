import React from 'react';
import NotesInput from './NotesInput';
import NotesSearch from './NotesSearch';
import NotesList from './NotesList';
//import NotesArchive from './NotesArchive';
import { getInitialData, showFormattedDate } from '../utils/index';
import Swal from '../lib/sweetalert2.min.js';
import '../lib/sweetalert2.min.css';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
 
class NotesApp extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
      id: 0,
      title: '',
      body: '-',
      createdAt: '',
      archived: false,
      notes: getInitialData(),
      keyword: ''
    }
 
    this.addNote 	= this.addNote.bind(this);
    this.isAct 	 	= this.isAct.bind(this);
    this.onTyping = this.onTyping.bind(this);
    this.onEdit 	= this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.wipe 		= this.wipe.bind(this);
    //this.setState({ notes: getInitialData});
    
  }

  addNote() {
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id        : +new Date(),
            title     : document.getElementById('it').value,
            body      : document.getElementById('in').value,
            archived  : this.state.archived,
            createdAt : new Date().toISOString(),
          }
        ]
      }
    });
    Toast.fire({icon: 'success',title: 'Catatan berhasil ditambahkan'})
  }
  isAct(e) {
    this.setState({ archived: e.target.checked});
  }
  onTyping(e) {
		var t = e.target.value
    if(t.length<=50){
    	this.setState({ title: t});
    }
  }
  onSearch(e) {
    this.setState({ keyword: e.target.value});
  }
  onEdit(id,val){
  	const notes = this.state.notes;
    const index = notes.findIndex(nt => nt.id == id);
    notes[index].archived = val;
    this.setState({ notes: notes});
    Toast.fire({icon: 'success',title: 'Catatan berhasil dipindahkan'})
  }
  onDelete(id) {
   	const notes = this.state.notes.filter(nt => nt.id !== id);
   	this.setState({ notes: notes});
   	Toast.fire({icon: 'success',title: 'Catatan berhasil dihapus'})
 	}
 	wipe(){
 	 const notes = this.state.notes;
    if(notes.length==0){
      Swal.fire('Oops!', 'Tidak ada catatan untuk dihapus', 'error')
    }
    else{
      this.setState({ notes: []});
      Toast.fire({icon: 'success',title: 'Semua catatan berhasil dihapus'})
    }
 	}
 
 	render() {
   return (
   	<div id="task">
			<div className="content">
				<div className="x">
					<h2 align="center">My Personal Notes</h2>
					<br/><br/>
					<div className="row">
						<p className="ml-auto">
							{
								"Sisa karakter : "+(50-this.state.title.length)	
							}
						</p>
					</div>
					<NotesInput addNote={this.addNote} isAct={this.isAct} onTyping={this.onTyping} title={this.state.title}/>
					<br/>
					<NotesSearch onSearch={this.onSearch}/>
					<br/><br/>
					<p style={{marginBottom: 10}}><b>Catatan Aktif</b></p>
					<NotesList NotesData={this.state.notes} onEdit={this.onEdit} onDelete={this.onDelete} keyword={this.state.keyword} archived={false}/>
					<br/>
					<p style={{marginBottom: 10}}><b>Arsip</b></p>
					<NotesList NotesData={this.state.notes} onEdit={this.onEdit} onDelete={this.onDelete} keyword={this.state.keyword} archived={true}/>
					<div className="row">
						<button className="ml-auto form-control btn-danger" onClick={this.wipe}>
							<p>Hapus semua catatan</p>
						</button>
					</div>
				</div>
			</div>
		</div>
   );
 }
}
 
export default NotesApp;