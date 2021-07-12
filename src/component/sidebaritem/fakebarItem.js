import React from 'react';
import SidebarComponent from '../sidebar/sidebar';
import './style.css'

class FakeSidebarItemComponent extends React.Component {
  constructor() {
    super();
    this.state = {
     
    }
  }

  // componentWillReceiveProps(nextProps, nextState) {
  //     console.log("------------1------------");
  //     this.setState({
  //     selectedNote: this.props.selectedNote,
  //     selectedNoteIndex: this.props.selectedNoteIndex,
  //     currentNote: this.props.currentNote,
  //     currentNoteId: this.props.currentNoteId,
  //     currentNoteTitle: this.props.currentNoteTitle,
  //     currentNoteTime: this.props.currentNoteTime
  //   })
  //   // console.log("item# " + this.state.currentNoteId + "; CurrentNote" + this.state.currentNote);
  // }

  componentDidMount = () => {
    console.log("------------1------------");
    this.setState({
     
    })
    // console.log("item# " + this.state.currentNoteId + "; CurrentNote" + this.state.currentNote);
  }

  componentDidUpdate = (prevProps, prevState) => {
    // console.log("------------2------------");
    if (this.props != prevProps) {
      this.setState({
      
      })
    }
  }


  render() {
    const { currentNote, currentNoteId } = this.state;
    // console.log(this.state.selectedNote);

   
      return (
        <div>
        <p className="title">
          {/* {this.state.currentNoteTitle == null ? this.state.currentNoteTitle : this.state.currentNoteTitle.length <= 25 ? this.state.currentNoteTitle : this.state.currentNoteTitle.slice(0, 25) + '...'} */}
        </p>
        <p>
          <p className="time">
            {/* {this.state.currentNoteTime} */}
          </p>
          <p className="paragraph">
            {/* {this.state.currentNote.length >= 15 ? this.state.currentNote.slice(0, 15) + '...' : this.state.currentNote} */}
          </p>
        </p>
      </div>
      )
    
    

            // backgroundColor: '#ffe680'
          
  }

}


export default FakeSidebarItemComponent