import React, {Component} from 'react';
import PageTitle from 'src/browser/components/PageTitle/PageTitle';
import SearchBox from 'src/browser/components/SearchBox/SearchBox';
import Card from 'src/browser/components/Card/Card';
import ReportService from 'src/browser/services/ReportService';
import {
  optionLineChartByDate,
  optionPieByDeviceType,
} from 'src/browser/utils/ChartOptions';
import EChart from 'src/browser/components/EChart/EChart';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportByDevicesOptions: {},
      reportByDayOptions: {},
    };
    ReportService.getActivityByDevices().then(({devices}) => {
      this.setState({
        reportByDevicesOptions: optionPieByDeviceType([
          {
            value: devices.mobile,
            name: 'Mobile',
          },
          {
            value: devices.desktop,
            name: 'Desktop',
          },
          {
            value: devices.tablet,
            name: 'Tablet',
          },
        ]),
      });
    });
    ReportService.getActivityByDay().then(({activities}) => {
      const headers = [],
        mobileData = [],
        desktopData = [],
        tabletData = [];
      activities.forEach(dayActivity => {
        headers.push(dayActivity.date);
        mobileData.push(dayActivity.mobile);
        desktopData.push(dayActivity.desktop);
        tabletData.push(dayActivity.tablet);
      });
      this.setState({
        reportByDayOptions: optionLineChartByDate({
          headers: headers,
          mobile: mobileData,
          desktop: desktopData,
          tablet: tabletData,
        }),
      });
    });
  }

  render() {
    const {reportByDayOptions, reportByDevicesOptions} = this.state;
    return (
      <div>
        <PageTitle title={'Home Page'}>
          <SearchBox />
        </PageTitle>
        <Card>
          <Card columnCount={2}>
            <EChart title="Active users" data={reportByDevicesOptions} />
          </Card>
          <Card columnCount={2}>
            <EChart title="All users sessions" data={reportByDayOptions} />
          </Card>
        </Card>
      </div>
    );
  }
}
