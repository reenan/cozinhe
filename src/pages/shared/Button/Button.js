import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './Button.scss';

import { Icon } from '../';

class Button extends Component {

  static propsTypes = {
    className: PropTypes.string,
    size: PropTypes.number,
    onClick: PropTypes.func
  }

  static defaultProps = {
    className: '',
    size: 0,
    onClick: () => {}
  }

  render() {
    const { children, className, style, onClick } = this.props;

    return (
      <div className={`button ${className}`} style={style} onClick={onClick}>
        {children}
      </div>
    )
  }
}

class IconButton extends Button {
  render() {
    const { icon, className, size } = this.props;

    let style = {};

    if (size) {
      style.width = size + 'px';
      style.height = size + 'px';
      style.lineHeight = size + 'px';
    }

    return (
      <Button {...this.props} style={style} className={`btn-icon ${className}`}>
        <Icon size={size} icon={icon} />
      </Button>
    )
  }
}

class TextButton extends Button {
  render() {
    const { text, className } = this.props;

    return (
      <Button className={`btn-text ${className}`}>
        <span>{text}</span>
      </Button>
    )
  }
}

export {
  IconButton,
  TextButton
}