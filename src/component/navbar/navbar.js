import React from 'react';
import debounce from '../../helper';
import './style.css'

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      addingNote: false,
      notes: null,
      selectedNoteIndex: -1,
      selectedNote: null,
      search: '',
      findresult: true,
      expand: true,
    }
    this.onChange = this.onChange.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.updateSearch2 = this.updateSearch2.bind(this);
  }

  componentDidMount() {
    this.setState({
      addingNote: this.props.addingNote,
      notes: this.props.notes,
      selectedNoteIndex: this.props.selectedNoteIndex,
      selectedNote: this.props.selectedNote,
      findresult: this.props.findresult,
      expand: this.props.expand
    })
  }

  componentDidUpdate() {
    if (this.state.findresult != this.props.findresult || this.state.expand !== this.props.expand) {
      this.setState({
        notes: this.props.notes,
        selectedNoteIndex: this.props.selectedNoteIndex,
        selectedNote: this.props.selectedNote,
        findresult: this.props.findresult,
        expand: this.props.expand
      })
    }
  }

  onChange(e) {
    this.setState({ search: e.target.value });
  }

  updateSearch = async (val) => {
    await this.setState({ search: val.target.value });
    this.update();
  };
  updateSearch2 = async (val) => {
    await this.setState({ search: val });
    this.update();
  };
  update = debounce(() => {
    this.props.searchNote(
      this.state.search
    )
    console.log("update")
  }
    , 500);

  render() {
    const id = this.state.selectedNoteIndex
    return (
      <div className="Navbar">
        <button className="button" onClick={this.props.newNote}>
          <i className="fas fa-edit"></i>
        </button>
        <button className="button" onClick={this.props.deleteNote}>
          <i className="fas fa-trash" ></i>
        </button>
        <button className="button" onClick={this.props.expandFunc}>
          <i className="fas fa-expand"></i>
        </button>
        
        <div className="searchbar">
          <i className="fas fa-search"></i>
          {(!this.state.findresult) && (this.state.search !== '') ?

            <input className="searchinput"
              value={this.state.search}
              onChange={this.updateSearch}
              onKeyPress={async (e) => {
                if (e.which !== 13) return
                else {
                  this.props.newNotewithTitle(this.state.search)
                  await this.setState({
                    search: ''
                  })
                  this.updateSearch2(this.state.search)
                }
              }}>
            </input>
            :
            <input className="searchinput"
              value={this.state.search}
              onChange={this.updateSearch}>
            </input>
          }
        </div>
      </div>
    )
  }
}

export default Navbar