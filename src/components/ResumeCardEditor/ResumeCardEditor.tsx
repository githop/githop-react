import * as React from 'react';
import AccomplishmentsContainer from '../../containers/AccomplishmentsContainer';
import { CardContent, titleMap } from '../../models';
import ResumeCardContents from '../ResumeCardContents/ResumeCardContents';
import './ResumeCardEditor.css';

interface Props {
  cardContent: CardContent;
  updateContents: (nc: CardContent) => Promise<void>;
  deleteCard: (rmCard: CardContent) => Promise<void>;
}

interface State {
  editCard: CardContent;
  isAdding: boolean;
}
export default class ResumeCardEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editCard: this.props.cardContent,
      isAdding: this.props.cardContent.key == null,
    };
    this.onInputFieldChange = this.onInputFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAccomplishementPreview = this.handleAccomplishementPreview.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onDateFieldChange = this.onDateFieldChange.bind(this);
    this.dispatchDeleteCard = this.dispatchDeleteCard.bind(this);
  }

  render() {
    return (
      <div className="page-root container resume-editor">
        <div className="editor-pane">
          <h3>{this.state.isAdding ? 'Add' : 'Edit'}</h3>
          <form onSubmit={this.handleSubmit}>
            {this.renderControls()}
            {this.renderCardTypeSelect()}
            {this.renderTitle()}
            {this.renderDates()}
            {this.renderPosition()}
            {this.renderDescription()}
            {this.renderAddAccomplishments()}
          </form>
        </div>
        <div className="accomplishment-preview-pane">
          <h5>Preview</h5>
          <div className="--downscale --no-click">
            <ResumeCardContents cardContent={this.state.editCard} />
          </div>
        </div>
      </div>
    );
  }

  renderDates() {
    return (
      <section>
        <label htmlFor="date">Date</label>
        <input
          name="date"
          value={this.state.editCard.date}
          type="text"
          onChange={this.onInputFieldChange}
        />
        <label htmlFor="sortDate">Sort Date</label>
        <input
          name="sortDate"
          value={this.state.editCard.sortDate}
          type="date"
          onChange={this.onDateFieldChange}
        />
      </section>
    );
  }

  renderControls() {
    const deleteButton = (
      <button onClick={this.dispatchDeleteCard} className="button-primary">
        delete card
      </button>
    );
    return (
      <section>
        <button>save card</button>
        {this.state.editCard.key != null ? deleteButton : null}
      </section>
    );
  }

  renderTitle() {
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
          onChange={this.onDateFieldChange}
        />
      </section>
    );
  }

  renderPosition() {
    return (
      <section>
        <label>Position</label>
        <input
          name="position"
          id="position"
          value={this.state.editCard.position}
          type="text"
          onChange={this.onInputFieldChange}
        />
      </section>
    );
  }

  renderDescription() {
    return (
      <section>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          className="u-full-width"
          name="description"
          value={this.state.editCard.description}
          onChange={this.onInputFieldChange}
        />
      </section>
    );
  }

  renderCardTypeSelect() {
    return (
      <label htmlFor="cardSelect">
        Card Type
        <select
          onChange={this.onSelectChange}
          id="cardSelect"
          value={this.state.editCard.type}
        >
          {this.renderTypeSelectOptions()}
        </select>
      </label>
    );
  }

  renderAddAccomplishments() {
    if (this.state.isAdding) {
      return null;
    }

    return (
      <section>
        <AccomplishmentsContainer
          parentKey={this.state.editCard.key}
          updatePreview={this.handleAccomplishementPreview}
        />
      </section>
    );
  }

  renderTypeSelectOptions() {
    const cardTypes = [
      'experience',
      'sideProjects',
      'talks',
      'startup',
      'education',
      'other',
    ];
    return cardTypes.map(t => {
      return (
        <option key={t} value={t}>
          {titleMap[t]}
        </option>
      );
    });
  }

  private handleAccomplishementPreview(a: any) {
    const newCard = Object.assign({}, this.state.editCard);
    newCard.accomplishments = a;
    this.setState({
      editCard: newCard,
    });
  }

  private handleSubmit(ev: any) {
    ev.preventDefault();
    this.props.updateContents(this.state.editCard);
  }

  private onInputFieldChange(event: any) {
    const {
      target: { name, value },
    } = event;
    this.setState({
      editCard: { ...this.state.editCard, ...{ [name]: value } },
    });
  }

  private onDateFieldChange(event: any) {
    event.preventDefault();
    const {
      target: { name, value },
    } = event;
    this.setState({
      editCard: { ...this.state.editCard, ...{ [name]: value } },
    });
  }

  private onSelectChange(e: any) {
    const newCard = Object.assign({}, this.state.editCard);
    const { value } = e.target;
    newCard.type = value;
    this.setState({
      editCard: newCard,
    });
  }

  private dispatchDeleteCard(e: any) {
    e.preventDefault();
    this.props.deleteCard(this.state.editCard);
  }
}
