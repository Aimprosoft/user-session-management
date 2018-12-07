import React, {Component} from 'react';
import PageTitle from 'src/browser/components/PageTitle/PageTitle';
import Card from 'src/browser/components/Card/Card';
import UserList from 'src/browser/components/UserList/UserList';

export default class UserPage extends Component {
  render() {
    const {match} = this.props;
    const status = match.params.status;
    return (
      <div>
        <PageTitle title={'User Page'} />
        <Card>
          <UserList status={status} />
        </Card>
      </div>
    );
  }
}
