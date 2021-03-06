import React, { Component } from 'react'
import { Icon } from '../../shared';
import './Calendar.scss';

import moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-BR');

//moment().year(value).month(value).daysInMonth();
//moment().year(value).month(value).startOf('month').day() => match weekDays
class Calendar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedMonth: 0,
      selectedYear: 2019
    }
  }

  static weekDays = ['DOM','SEG','TER','QUA','QUI','SEX','SAB'];

  prevMonth = () => {
    let { selectedMonth, selectedYear } = this.state;

    if (selectedMonth !== 0) {
      selectedMonth--;
    } else {
      selectedMonth = 11;
      selectedYear--;
    }

    this.setState({
      selectedMonth,
      selectedYear
    });
  }

  nextMonth = () => {
    let { selectedMonth, selectedYear } = this.state;

    if (selectedMonth !== 11) {
      selectedMonth++;
    } else {
      selectedMonth = 0;
      selectedYear++;
    }

    this.setState({
      selectedMonth,
      selectedYear
    });
  }

  render() {
    const { selectedMonth, selectedYear } = this.state;

    return (
      <div className='calendar'>
        <div className='header'>
          <p className='selected-year'>{selectedYear}</p>
          
          <Icon onClick={this.prevMonth} icon='arrow-left' />
          <p className='selected-month'>{moment().month(selectedMonth).format('MMMM')}</p>
          <Icon onClick= {this.nextMonth}icon='arrow-right' />
        </div>

        <WeekDays weekDays={Calendar.weekDays} />
        <Month year={selectedYear} month={selectedMonth} />
      </div>
    )
  }
}

class Month extends Component {

  MONTH_SIZE = 6 * 7;

  addLastMonthPaddingDays = () => {
    const { year, month } = this.props;
    let currentMonthFirstDay = moment().year(year).month(month).startOf('month').day();
    let lastMonthDaysCount = moment().year(year).month(month).subtract(1, 'month').daysInMonth();
    let paddingValue = lastMonthDaysCount - currentMonthFirstDay;

    let list = [];
    while (list.length < currentMonthFirstDay) {
      list.push(
        <li key={list.length} className='disabled'>
          <span>{++paddingValue}</span>
        </li>
      )
    }

    return list;
  }

  addCurrentMonthDays = (list) => {
    const { year, month } = this.props;
    let monthDaysCount = moment().year(year).month(month).daysInMonth();

    for (let i = 1; i <= monthDaysCount; i++) {
      list.push(
        <li key={list.length}>
          <span>{i}</span>
        </li>
      )
    }

    return list;
  }

  addNextMonthPaddingDays = (list) => {
    let paddingValue = 0;

    while (list.length < this.MONTH_SIZE) {
      list.push(
        <li key={list.length} className='disabled'>
          <span>{++paddingValue}</span>
        </li>
      )
    }

    return list;
  }

  render() {
    let month = [];

    month = this.addLastMonthPaddingDays();
    month = this.addCurrentMonthDays(month);
    month = this.addNextMonthPaddingDays(month);

    return (
      <ul className='month'>
        {month}
      </ul>
    )

  }
}

const WeekDays = ({ weekDays }) => {
  return (
    <ul className='weekdays'>
      {
        weekDays.map((item, index) => {
          return (
            <li key={index}>
              <span>{item}</span>
            </li>
          )
        })
      }
    </ul>
  )
}

export default Calendar