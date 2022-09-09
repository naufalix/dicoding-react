import React from 'react';
 
class NotesInput extends React.Component {

  render() {
    return (
		  <div>
			  <input className="wfa form-control" type="text" id="it" placeholder="Judul" onChange={e => this.props.onTyping(e)} value={this.props.title}/>
			  <textarea className="wfa form-control pt-2" rows="5" id="in" placeholder="Catatan"></textarea>
			  <div className="row">
				  <input className="baseline" id="ia" type="checkbox" onChange={e => this.props.isAct(e)}/>
          <label htmlFor="ia">Arsipkan</label>
          <button className="ml-auto form-control btn-primary" onClick={e => this.props.addNote(e)}>
            <p>Tambahkan catatan</p>
          </button>
			  </div>
		  </div>
   );
 }

}

export default NotesInput;