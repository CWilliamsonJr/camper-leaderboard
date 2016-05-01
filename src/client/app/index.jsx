require('../css/style.scss');

import React from 'react';
import ReactDOM from 'react-dom';

class TableContainer extends React.Component { // container for the table
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <TableData/>
                </div>
            </div>
        );
    }
}

class TableData extends React.Component { // Displays the table
    constructor(props) {
        super(props);
        this.state = {
            campers: []
             // holds the camper data
        };
    }

    componentWillMount() {
        this.getCampers();
    }

    getCampers() { // gets the camper infor via Ajax

        let CamperUrl = 'http://fcctop100.herokuapp.com/api/fccusers/top/recent';
        $.ajax({
            url: CamperUrl,
            dataType: 'json',
            method: 'GET',
            success: (data) => {
                this.setState({campers: data});
            }
        });
    }
    changeSort(sort){
     let campers = this.state.campers;
     if(sort === 'alltime'){
        let newcampers = campers.sort((a,b) =>{
             return b.alltime - a.alltime;
         });
         $('#alltime').removeClass('no-show');
         $('#recent').addClass('no-show');
         this.setState({campers:newcampers});
     }else{
        let newcampers = campers.sort((a,b) =>{
             return b.recent - a.recent;
         });
         $('#recent').removeClass('no-show');
         $('#alltime').addClass('no-show')
         this.setState({campers:newcampers});
     }
    }

    render() {
        let campers = this.state.campers;
        let siteUrl = 'https://www.freecodecamp.com/';
        return (
            <table>
                <caption className='table-caption'><strong>Free Code Camp Leaderboard</strong></caption>
                <tbody>
                    <tr>
                        <th>Rank #</th>
                        <th>Camper Name</th>
                        <th onClick={() => this.changeSort('alltime')} ref='alltime'>Points Alltime <span className='no-show' id='alltime'>&#9660;</span></th>
                        <th onClick={() => this.changeSort('recent')}  ref='recent'>Points Recent  <span className='' id='recent'>&#9660;</span></th>
                    </tr>
                </tbody>
                {campers.map((element, index) => {
                    return <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                            <img className="avatarimg img-thumbnail" src={element.img}></img>
                            <a href={siteUrl + element.username}>{element.username}</a>
                        </td>
                        <td>{element.alltime}</td>
                        <td>{element.recent}
                        </td>
                    </tr>;
                })}
            </table>
        );
    }
}

const content = document.getElementById('content');

ReactDOM.render(
    <TableContainer/>, content);
