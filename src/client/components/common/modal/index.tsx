import * as React from "react";
import ReactDOM from "react-dom";
import styles from "./index.css";
interface Props {
  children: any;
  isOpen: boolean;
  onClose: () => void;
}

class Modal extends React.Component<Props> {
  componentDidMount() {
    if (this.props.isOpen) {
      this.setUp();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.isOpen && !this.props.isOpen) {
      this.setUp();
    } else if (!nextProps.isOpen && this.props.isOpen) {
      this.clear();
    }
  }

  modalBaseDom: HTMLElement;
  modalDom: HTMLElement;

  setUp() {
    if (!this.modalBaseDom) {
      this.modalBaseDom = document.createElement("div");
      this.modalBaseDom.className = styles.modalBase;
      this.modalBaseDom.addEventListener("click", this.props.onClose);
    }
    if (!this.modalDom) {
      this.modalDom = document.createElement("div");
      this.modalDom.className = styles.modal;
    }
    document.getElementById("root").append(this.modalBaseDom);
    document.getElementById("root").append(this.modalDom);
  }

  clear() {
    if (this.modalBaseDom) {
      this.modalBaseDom.removeEventListener("click", this.props.onClose);
      this.modalBaseDom.remove();
      this.modalBaseDom = null;
    }
    if (this.modalDom) {
      this.modalDom.remove();
      this.modalDom = null;
    }
  }

  render() {
    if (this.modalDom) {
      return ReactDOM.createPortal(
        <div className={styles.modalInner}>{this.props.children}</div>,
        this.modalDom
      );
    } else {
      return null;
    }
  }
}

export { Modal };
