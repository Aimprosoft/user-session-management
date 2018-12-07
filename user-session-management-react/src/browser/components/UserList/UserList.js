import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UsersService from 'src/browser/services/ProfileService';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import style from './UserList.scss';

export default class UserList extends Component {
  constructor(props) {
    super(props);
    const {status} = this.props;
    this.state = {
      users: [],
      status,
    };
    this.deleteUser = this.deleteUser.bind(this);
    this.updateState = this.updateState.bind(this);
    this.formatStatusCell = this.formatStatusCell.bind(this);
    this.formatImageCell = this.formatImageCell.bind(this);
    this.formatActionsCell = this.formatActionsCell.bind(this);

    UsersService.getUsers(status).then(users => {
      this.setState({users});
    });
    this.logoutTooltip = (
      <Tooltip id="tooltip">
        <strong>Logout</strong> user.
      </Tooltip>
    );
  }

  updateState() {
    const {status} = this.props;
    UsersService.getUsers(status).then(users => {
      this.setState({
        status,
        users,
      });
    });
  }

  deleteUser(userName) {
    UsersService.closeSession(userName).then(() => {
      this.updateState();
    });
  }

  formatStatusCell(cell, row) {
    return <span className={row.isActive ? 'online' : 'offline'} />;
  }

  formatImageCell(cell) {
    return (
      <img
        src={UsersService.getUserAvatar(cell)}
        alt="..."
        className={style.userImage}
      />
    );
  }

  formatActionsCell(cell, row) {
    const handler = this.deleteUser.bind(this, row.id);
    return (
      <div>
        {row.isActive && (
          <button
            className={style.actionButton}
            type="button"
            onClick={handler}>
            <OverlayTrigger placement="top" overlay={this.logoutTooltip}>
              <FontAwesomeIcon size="2x" icon="sign-out-alt" />
            </OverlayTrigger>
          </button>
        )}
      </div>
    );
  }
  render() {
    const {users, status: stateStatus} = this.state;
    const {status: propsStatus} = this.props;
    const columns = [
      {
        dataField: 'isActive',
        text: 'Status',
        align: 'center',
        formatter: this.formatStatusCell,
        hidden: propsStatus !== 'all',
      },
      {
        dataField: 'avatarId',
        text: 'Avatar',
        align: 'center',
        formatter: this.formatImageCell,
      },
      {
        dataField: 'id',
        text: 'User Name',
        sort: true,
      },
      {
        dataField: 'firstName',
        text: 'First Name',
        filter: textFilter(),
        sort: true,
      },
      {
        dataField: 'lastName',
        text: 'Last Name',
        filter: textFilter(),
        sort: true,
      },
      {
        dataField: 'telephone',
        text: 'Telephone',
        filter: textFilter(),
        sort: true,
      },
      {
        dataField: 'email',
        text: 'Email',
        filter: textFilter(),
        sort: true,
      },
      {
        dataField: 'isActive',
        text: 'Actions',
        formatter: this.formatActionsCell,
        hidden: propsStatus === 'all',
      },
    ];
    if (stateStatus !== propsStatus) {
      this.updateState();
    }

    return (
      <BootstrapTable
        keyField="id"
        data={users}
        columns={columns}
        filter={filterFactory()}
        noDataIndication="No Users"
        pagination={paginationFactory()}
        striped
        hover
        condensed
      />
    );
  }
}
UserList.propTypes = {
  status: PropTypes.oneOf(['active', 'all']),
};
UserList.defaultProps = {
  status: 'all',
};
