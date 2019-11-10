import React from 'react';
import { Select, FormControl, InputLabel, MenuItem, Input, Chip, Checkbox, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useChart } from './chart-context';

const styles = makeStyles({
  formControl: {
      width: 120
    }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function MetricSelector(props) {
  const classes = styles();
  const [personName, setPersonName] = React.useState([]);
  const [ metrics, setMetrics ] = useChart();
  const handleChange = (e) => {
    //setMetrics({type: 'SELECT_METRIC', payload: e.target.value})
    setPersonName(e.target.value);
    console.log(personName);
  };
  // const handleChangeMultiple = event => {
  //   const { options } = event.target;
  //   const value = [];
  //   for (let i = 0, l = options.length; i < l; i += 1) {
  //     if (options[i].selected) {
  //       value.push(options[i].value);
  //     }
  //   }
  //   setPersonName(options);
  //   console.log()
  // };
  return (
    <FormControl className={classes.formControl}>
       <InputLabel >Metrics</InputLabel>
       <Select
         id="demo-mutiple-checkbox"
         multiple
         value={personName}
         onChange={handleChange}
         input={<Input />}
         renderValue={selected => selected.join(', ')}
         MenuProps={MenuProps}
       >
         {names.map(name => (
           <MenuItem key={name} value={name}>
             <Checkbox checked={personName.indexOf(name) > -1} />
             <ListItemText primary={name} />
           </MenuItem>
         ))}
       </Select>
     </FormControl>
  )
}

export default MetricSelector
