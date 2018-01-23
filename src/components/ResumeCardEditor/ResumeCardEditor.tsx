import './ResumeCardEditor.css';
import * as React from 'react';
import { CardContent, titleMap } from '../../models';
import AccomplishmentsContainer from '../../containers/AccomplishmentsContainer';
import ResumeCardContents from '../ResumeCardContents/ResumeCardContents';

interface Props {
  cardContent: CardContent;
  updateContents: (nc: CardContent) => Promise<void>;
}

interface State {
  editCard: CardContent;
}
export default class ResumeCardEditor extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { editCard: this.props.cardContent };
    this.onInputFieldChange = this.onInputFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAccomplishementPreview = this.handleAccomplishementPreview.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  render() {
    return (
        <div className="page-root container resume-editor">
          <div className="editor-pane">
            <h3>Edit Card</h3>
            <form onSubmit={this.handleSubmit}>
              {this.renderCardTypeSelect()}
              {this.renderTitle()}
              {this.renderDate()}
              {this.renderDescription()}
              <section>
                <AccomplishmentsContainer
                    parentKey={this.state.editCard.key}
                    updatePreview={this.handleAccomplishementPreview}
                />
              </section>
              <button>save</button>
            </form>
          </div>
          <div className="accomplishment-preview-pane">
            <h5>Preview</h5>
            <div className="--downscale --no-click">
              <ResumeCardContents cardContent={this.state.editCard}/>
            </div>
          </div>
        </div>
    );
  }

  private handleAccomplishementPreview(a: any) {
    const newCard = Object.assign({}, this.state.editCard);
    newCard.accomplishments = a;
    this.setState({
      editCard: newCard
    });
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
              className="u-full-width"
              name="description"
              value={this.state.editCard.description}
              onChange={this.onInputFieldChange}
          />
        </section>
    );
  }
  
  private onInputFieldChange(event: any) {
    const { target: { name, value } } = event;
    this.setState({
      editCard: { ...this.state.editCard, ...{ [name]: value } }
    });
  }

  private onSelectChange(e: any) {
    const newCard = Object.assign({}, this.state.editCard);
    const { value } = e.target;
    newCard.type = value;
    this.setState({
      editCard: newCard
    });
  }

  private renderCardTypeSelect() {
    return (
        <label htmlFor="cardSelect">Card Type
        <select onChange={this.onSelectChange} id="cardSelect" value={this.state.editCard.type}>
          {this.renderTypeSelectOptions()}
        </select>
        </label>
    );
  }

  private renderTypeSelectOptions() {
    const cardTypes = ['experience', 'sideProjects', 'talks', 'startup', 'education', 'other'];
    return cardTypes.map(t => {
      return <option key={t} value={t}>{titleMap[t]}</option>;
    });
  }
}