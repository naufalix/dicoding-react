import React from 'react';
 
class NotesSearch extends React.Component {

 render() {
   return (
    <>
      <p style={{marginBottom: 10}}><b>Cari catatan</b></p>
      <input className="wfa form-control" onKeyUp={e => this.props.onSearch(e)} type="text" placeholder="Search"/>
    </>
   );
 }
}
 
export default NotesSearch;