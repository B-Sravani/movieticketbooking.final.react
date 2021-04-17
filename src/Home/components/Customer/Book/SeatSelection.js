import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import './SeatCSS.css';
let SEAT_NO = 0;
let ROWS = 2;
let COLS = 2;
const TableRow = (props) => {
  return (
    <td>
      <button
        className={
          props.isAvailable
            ? ['btn', 'btn-available', 'btn-available-i'].join(' ')
            : ['btn', 'btn-booked', 'btn-booked-i'].join(' ')
        }
        onClick={props.book}
      >
        {props.ic}
      </button>
    </td>
  );
};

class Seat extends Component {
  state = {
    rows: [],
    row: 0,
    col: 0,
    seatLeft: ROWS * COLS,
    seatBooked: 0,
    booked: [],
  };

  filler = () => {
    SEAT_NO = 0;
    let rows = [];
    for (let i = 1; i <= ROWS; i++) {
      let seat = [];
      let letterCode = String.fromCharCode(i + 64);
      let col = 1;
      for (let j = 1; j <= COLS; j++)
        seat.push({
          available: true,
          seatNo: ++SEAT_NO,
          ic: letterCode + col++,
        });
      rows.push(seat);
    }
    this.setState({
      rows,
      seatLeft: ROWS * COLS,
      seatBooked: 0,
    });
  };
  componentDidMount() {
    ROWS = this.props.props.rows;
    COLS = this.props.props.columns;

    this.filler();
  }

  handleRowChange = (event) => {
    let row = +event.target.value;
    if (row > 26) row = 26;
    else if (row < 1) row = 1;
    this.setState({ row });
  };
  handleColChange = (event) => {
    let col = +event.target.value;
    if (col > 6) col = 6;
    else if (col < 0) col = 0;
    this.setState({ col });
  };
  changeRowCol = () => {
    ROWS = this.state.row;
    COLS = this.state.col;
    this.filler();
  };
  book = (seatNo) => {
    let rows = this.state.rows.map((row) =>
      row.map((seat) => {
        if (seat.seatNo !== seatNo) return seat;
        else {
          if (seat.available)
            this.setState((prevState) => ({
              seatLeft: prevState.seatLeft - 1,
              seatBooked: prevState.seatBooked + 1,
            }));
          else
            this.setState((prevState) => ({
              seatLeft: prevState.seatLeft + 1,
              seatBooked: prevState.seatBooked - 1,
            }));
          return {
            available: !seat.available,
            seatNo: seat.seatNo,
            ic: seat.ic,
          };
        }
      })
    );
    this.setState({ rows });

    if (!this.state.booked.includes(seatNo)) {
      this.setState((prevState) => ({
        booked: [...prevState.booked, seatNo],
      }));
    } else {
      var index = this.state.booked.indexOf(seatNo);
      this.state.booked.splice(index, 1);
    }
  };

  render() {
    return (
      <div>
        <table>
          <tbody>
            {this.state.rows.map((row, index) => (
              <tr key={index}>
                {row.map((seat) => (
                  <TableRow
                    book={() => this.book(seat.seatNo)}
                    isAvailable={seat.available}
                    ic={seat.ic}
                    key={seat.ic}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <Button
          onClick={() => {
            this.props.handleChange(this.state.booked);
          }}
          variant='contained'
          color='primary'
          style={{ margin: '10px', float: 'right' }}
        >
          Done
        </Button>
        <div style={{ padding: 10, top: 10, right: 10 }}>
          <p>
            Seat Booked:{' '}
            <strong style={{ color: 'red' }}>{this.state.seatBooked}</strong>
          </p>
          <p>
            Seat Left:{' '}
            <strong style={{ color: 'green' }}>{this.state.seatLeft}</strong>
          </p>
        </div>
      </div>
    );
  }
}

export default Seat;
