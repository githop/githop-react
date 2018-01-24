import * as React from 'react';
import { CardAccomplishment, createInstance } from '../models';

interface Props {
  parentKey: string;
  accomplishments: CardAccomplishment[];
  updateAccomplishment: (na: CardAccomplishment) => Promise<void>;
  updatePreview: (tna: any) => any;
  addAccomplishment: (na: CardAccomplishment) => Promise<void>;
  deleteAccomplishment: (accomplishmentKey: string) => Promise<void>;
}

interface State {
  accomplishments: CardAccomplishment[] | undefined;
  tempAccomplishment: CardAccomplishment | null;
}

export default class Accomplishments extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      accomplishments: this.props.accomplishments,
      tempAccomplishment: null
    };
    this.updateTempAccomplishment = this.updateTempAccomplishment.bind(this);
    this.addTempAccomplishment = this.addTempAccomplishment.bind(this);
    this.dispatchAddAccomplishment = this.dispatchAddAccomplishment.bind(this);
    this.dispatchDeleteAccomplishment = this.dispatchDeleteAccomplishment.bind(this);
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.accomplishments.length !== this.props.accomplishments.length) {
      this.setState({
        accomplishments: nextProps.accomplishments
      });
      this.props.updatePreview(nextProps.accomplishments);
    }
  }

  render() {
    return (
        <div>
          <label>Accomplishments</label>
          {this.renderTempAccomplishment()}
          {this.renderAccomplishments()}
        </div>
    );
  }

  private renderAccomplishments() {
    if (this.state.accomplishments == null) {
      return null;
    }

    return this.state.accomplishments.map(a => {
      return (
          <div key={a.key}>
            <textarea
                className="u-full-width"
                name={a.key}
                value={a.text}
                onChange={(e) => this.handleInputFieldChange(e, a)}
            />
            <button onClick={(e) => this.dispatchUpdate(e, a)}>update</button>
            <button onClick={(e) => this.dispatchDeleteAccomplishment(e, a.key)}>Delete</button>
          </div>
      );
    });
  }

  private renderTempAccomplishment() {
    if (this.state.tempAccomplishment == null) {
      return <button onClick={this.addTempAccomplishment}>Add</button>;
    }

    return (
        <div>
          <label>New Accomplishment</label>
          <textarea
              className="u-full-width"
              name="tempAccomplishment"
              value={this.state.tempAccomplishment.text}
              onChange={this.updateTempAccomplishment}
          />

          <button onClick={this.dispatchAddAccomplishment}>Add</button>
          <button onClick={() => this.setState({tempAccomplishment: null})}>Delete</button>
        </div>
    );
  }

  private dispatchDeleteAccomplishment(e: any, key: string) {
    e.preventDefault();
    this.props.deleteAccomplishment(key);
  }

  private dispatchAddAccomplishment() {
    if (this.state.tempAccomplishment != null) {
      this.props.addAccomplishment(this.state.tempAccomplishment);
      this.setState({
        tempAccomplishment: null
      });
    }
  }

  private updateTempAccomplishment(e: any) {
    const { name, value } = e.target;
    this.setState({
      [name]: Object.assign({}, this.state.tempAccomplishment, { text: value })
    });
  }

  private addTempAccomplishment() {
    const tempAccomplishment = createInstance(CardAccomplishment, {
      text: '',
      parentKey: this.props.parentKey
    });
    this.setState({
      tempAccomplishment
    });
  }

  private dispatchUpdate(e: any, a: CardAccomplishment) {
    e.preventDefault();
    this.props.updateAccomplishment(a);
  }

  private handleInputFieldChange(e: any, originalAccmp: CardAccomplishment) {
    const {value} = e.target;
    originalAccmp.text = value;
    this.setState({
      accomplishments: [...this.state.accomplishments!]
    });

    this.props.updatePreview(this.state.accomplishments);
  }

}
