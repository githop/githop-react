import * as React from 'react';

interface Props {
  login: (credentials: { email: string; password: string }) => Promise<void>;
  // email: string;
  // password: string;
}

interface State {
  email: string;
  password: string;
}

export default class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="page-root">
        <h1>Admin Login</h1>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input onChange={this.handleInputChange} id="email" name="email" type="email" />

          <label htmlFor="password">Password</label>
          <input
            onChange={this.handleInputChange}
            id="password"
            name="password"
            type="password"
          />
          <div>
            <button>Login</button>
          </div>
        </form>
      </div>
    );
  }

  private handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { name, value },
    } = event;
    this.setState(state => ({ ...state, [name]: value }));
  }

  private handleSubmit(event: any) {
    event.preventDefault();
    this.props.login(this.state);
  }
}
