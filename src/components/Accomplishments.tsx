import * as React from 'react';
import { CardAccomplishment } from '../models';

interface Props {
  accomplishments: CardAccomplishment[];
  updateAccomplishment: (na: CardAccomplishment) => Promise<void>;
  updatePreview: (tna: any) => any;
}

interface State {
  accomplishments: CardAccomplishment[] | undefined;
}

export default class Accomplishments extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      accomplishments: this.props.accomplishments
    };
  }

  render() {
    return (
        <div>
          <label>Accomplishments</label>
          <button>Add</button>
          {this.renderAccomplishments()}
        </div>
    );
  }

  renderAccomplishments() {
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
            <button>Delete</button>
          </div>
      );
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
