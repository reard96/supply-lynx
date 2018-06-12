import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Cloud from '@material-ui/icons/Cloud';
import CloudDone from '@material-ui/icons/CloudDone';
import CloudUpload from '@material-ui/icons/CloudUpload';
import CloudQueue from '@material-ui/icons/CloudQueue';
import CloudOff from '@material-ui/icons/CloudOff';

const StatusTabs = ({ tab, changeTab }) => {
  return (
    <Tabs
      value={tab}
      onChange={changeTab}
      fullWidth
      indicatorColor="secondary"
      textColor="secondary"
    >
      <Tab icon={<Cloud />} label="ALL" />
      <Tab icon={<CloudQueue />} label="REQUESTED" />
      <Tab icon={<CloudUpload />} label="ACCEPTED" />
      <Tab icon={<CloudDone />} label="COMPLETED" />
      <Tab icon={<CloudOff />} label="CANCELLED" />
    </Tabs>
  );
};

export default StatusTabs;
