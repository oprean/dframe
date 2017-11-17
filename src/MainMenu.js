import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/navigation/menu';
import {white} from 'material-ui/styles/colors';
import cs from './constants';

export default class MainMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => {
      this.setState({open: !this.state.open})
  };

  handleClick = (moduleId) => {
      
      console.log(moduleId);
      this.setState({open: false});
      this.props.conn.sendMessage(
            JSON.stringify({
                text:cs.CMD_SWITCH_MODULE,
                params:moduleId
            })
        )
  }

  render() {
  
const styles = {
  smallIcon: {
    width: 36,
    height: 36,
  },
  small: {
    position:'absolute',
    top: 0,
    left:0,      
    width: 72,
    height: 72,
    padding: 16,
  },
  drawer: {
      backgroundColor:'#cccccc',
  }
};
 
    return (
      <div>
        <IconButton
          onClick={this.handleToggle}
          iconStyle={styles.smallIcon}
          style={styles.small}>
          <ActionHome color={white} />
          </IconButton>
        <Drawer
          containerStyle={styles.drawer}       
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >

          <MenuItem onClick={this.handleClick.bind(this,'photos')}>Digital Frame</MenuItem>
          <MenuItem onClick={this.handleClick.bind(this,'weather')}>Weather-Clock</MenuItem>
          <MenuItem onClick={this.handleClick.bind(this,'home')}>Home Automation</MenuItem>
          <MenuItem onClick={this.handleClick.bind(this,'config')}>Configuration</MenuItem>
        </Drawer>
      </div>
    );
  }
}