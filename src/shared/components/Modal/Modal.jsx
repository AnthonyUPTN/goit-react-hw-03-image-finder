import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';

import s from './modal.module.css';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }

  closeModal = e => {
    const { onClose } = this.props;
    if (e.code === 'Escape') {
      onClose();
      return;
    }
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  render() {
    const { children } = this.props;
    const { closeModal } = this;

    console.log({ children });
    return createPortal(
      <div className={s.overlay} onClick={closeModal}>
        <div className={s.modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
