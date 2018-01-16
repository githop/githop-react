import './ResumeCardEditor.css';
import * as React from 'react';
import { CardContent } from '../../models';

interface Props {
  cardContent: CardContent;
  updateContents: (nc: CardContent) => Promise<void>;
}

interface State {
  editCard: CardContent;
}
/*
  key?: string;
  type: CardTypes;
  title: string;
  link?: string;
  date: string;
  description: string;
  position?: string;
  accomplishments?: CardAccomplishment[];
  accomplishmentKeys?: string[];
'experience' | 'sideProjects' | 'talks' | 'startup' | 'education' | 'other';
* */

export default class ResumeCardEditor extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { editCard: this.props.cardContent };
    this.onInputFieldChange = this.onInputFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
        <div>
          <h3>Edit Card</h3>
          <form onSubmit={this.handleSubmit}>
            {this.renderCardTypeSelect()}
            {this.renderTitle()}
            {this.renderDate()}
            {this.renderDescription()}
            <section>
              {this.renderAccomplishments()}
            </section>
            <button>save</button>
          </form>
        </div>
    );
  }

  private handleSubmit(ev: any) {
    ev.preventDefault();
    this.props.updateContents(this.state.editCard);
  }

  private renderDate() {
    return (
        <section>
          <label htmlFor="date">Date</label>
          <input
              name="date"
              value={this.state.editCard.date}
              type="text"
              onChange={this.onInputFieldChange}
          />
        </section>
    );
  }

  private renderTitle() {
    return (
        <section>
          <label htmlFor="title">Title</label>
          <input
              name="title"
              id="title"
              value={this.state.editCard.title}
              type="text"
              onChange={this.onInputFieldChange}
          />
          <label htmlFor="link">Title Link</label>
          <input
              name="link"
              id="link"
              value={this.state.editCard.link}
              type="url"
              onChange={this.onInputFieldChange}
          />
        </section>
    );
  }

  private renderDescription() {
    return (
        <section>
          <label htmlFor="description">Description</label>
          <textarea
              id="description"
              name="description"
              value={this.state.editCard.description}
              onChange={this.onInputFieldChange}
          />
        </section>
    );
  }

  private renderAccomplishments() {

    if (this.state.editCard.accomplishments == null) {
      return null;
    }

    return this.state.editCard.accomplishments.map(a => {
      return (
          <label key={a.key}>
            <input value={a.text} onChange={() => void 0}/>
          </label>
      );
    });
  }

  private onInputFieldChange(event: any) {
    const { target: { name, value } } = event;
    this.setState({
      editCard: { ...this.state.editCard, ...{ [name]: value } }
    });
  }

  private renderCardTypeSelect() {
    return (
        <label htmlFor="cardSelect">Card Type
        <select onChange={() => void 0} id="cardSelect" value={this.props.cardContent.type}>
          {this.renderTypeSelectOptions()}
        </select>
        </label>
    );
  }

  private renderTypeSelectOptions() {
    const cardTypes = ['experience', 'sideProjects', 'talks', 'startup', 'education', 'other'];
    return cardTypes.map(t => {
      return <option key={t} value={t}>{t}</option>;
    });
  }
}