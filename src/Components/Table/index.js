import * as React from "react";
import { connect } from "react-redux";
import { URL } from "../../constants";
import IconButton from "@material-ui/core/IconButton";
import {
  EditingState,
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging,
  SelectionState
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  PagingPanel,
  TableColumnResizing,
  Toolbar,
  TableSelection
} from "@devexpress/dx-react-grid-material-ui";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";
import { changeSelectedItem } from "../../actions";

const styles = theme => ({
  lookupEditCell: {
    paddingTop: theme.spacing.unit * 0.875,
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit
  },
  dialog: {
    width: "calc(100% - 16px)"
  },
  inputRoot: {
    width: "100%"
  }
});

const AddButton = ({ onExecute }) => (
  <div style={{ textAlign: "center" }}>
    <IconButton color="primary" onClick={onExecute} title="Создать новый ряд">
      <AddIcon />
    </IconButton>
  </div>
);

const EditButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Редактировать">
    <EditIcon />
  </IconButton>
);

const DeleteButton = ({ onExecute }) => (
  <IconButton
    onClick={() => {
      // eslint-disable-next-line
      if (window.confirm("Вы уверены что хотите удалить этот ряд?")) {
        onExecute();
      }
    }}
    title="Delete row"
  >
    <DeleteIcon />
  </IconButton>
);

const CommitButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Save changes">
    <SaveIcon />
  </IconButton>
);

const CancelButton = ({ onExecute }) => (
  <IconButton color="secondary" onClick={onExecute} title="Cancel changes">
    <CancelIcon />
  </IconButton>
);

const commandComponents = {
  add: AddButton,
  edit: EditButton,
  delete: DeleteButton,
  commit: CommitButton,
  cancel: CancelButton
};

// const availableValues = {
//   copyrightownerid: [
//     { name: "Syncopy", id: 1 },
//     { name: "Universal Studios", id: 2 }
//   ]
// };
// const availableValues = {
//   copyrightownerid: ["Syncopy", "Universal Studios"]
// };
const availableValues = {
  copyrightownerid: {
    1: "Castle Rock Entertainment",
    2: "Universal Studios",
    3: "20 Century Fox",
    4: "Quad",
    5: "Gaumont",
    6: "Syncopy"
  }
};

// const BooleanFormatter = ({ value }) => <Chip label={value ? 'Yes' : 'No'} />;

// const BooleanEditor = ({ value, onValueChange }) => (
//   <Select
//     input={<Input />}
//     value={value ? 'Yes' : 'No'}
//     onChange={event => onValueChange(event.target.value === 'Yes')}
//     style={{ width: '100%' }}
//   >
//     <MenuItem value="Yes">
//       Yes
//     </MenuItem>
//     <MenuItem value="No">
//       No
//     </MenuItem>
//   </Select>
// );

// const BooleanTypeProvider = props => (
//   <DataTypeProvider
//     formatterComponent={BooleanFormatter}
//     editorComponent={BooleanEditor}
//     {...props}
//   />
// );

const LookupEditCellBase = ({
  availableColumnValues,
  value,
  onValueChange,
  classes
}) => (
  <TableCell className={classes.lookupEditCell}>
    <Select
      value={value}
      onChange={(event, child) => {
        console.log(child);
        onValueChange(event.target.value);
      }}
      // onChange={event => onValueChange(event.target.value)}
      input={<Input classes={{ root: classes.inputRoot }} />}
    >
      {/* {console.log(value)} */}
      {/* {availableColumnValues.map(item => (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      ))} */}
      {Object.entries(availableColumnValues).map(item => (
        <MenuItem key={item[0]} value={item[0]}>
          {item[1]}
        </MenuItem>
      ))}
    </Select>
  </TableCell>
);
export const LookupEditCell = withStyles(styles, {
  name: "ControlledModeDemo"
})(LookupEditCellBase);

const EditCell = props => {
  const { column } = props;
  const availableColumnValues = availableValues[column.name];
  if (availableColumnValues) {
    return (
      <LookupEditCell
        {...props}
        availableColumnValues={availableColumnValues}
      />
    );
  }
  return <TableEditRow.Cell {...props} />;
};

const Command = ({ id, onExecute }) => {
  const CommandButton = commandComponents[id];
  return <CommandButton onExecute={onExecute} />;
};
const mapStateToProps = state => {
  return {
    selectedItem: state.appReducer.selectedItem
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectChange: selectedItem => dispatch(changeSelectedItem(selectedItem))
  };
};

const tableMessages = {
  noData: "Нет данных"
};
// const editColumnMessages = {
//   addCommand: <AddIcon />,
//   editCommand: <EditIcon />,
//   deleteCommand: <DeleteIcon />,
//   commitCommand: <SaveIcon />,
//   cancelCommand: <CancelIcon />
// };

const pagingPanelMessages = {
  showAll: "Показать все",
  rowsPerPage: "Ряды",
  info: "{from} из {to} ({count} элементов)"
};

class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      rows: [],
      pageSizes: [5, 10, 15, 0],
      tableColumnExtensions: [],
      editingRowIds: [],
      addedRows: [],
      rowChanges: {},
      selection: [],
      selectedID: {},
      selectedItem: this.props.selectedItem
    };

    //spreading object options
    this.changeSorting = sorting => {
      //geting sort options
      let [sortObject] = sorting;
      //getting index of sort item
      let sortIndex = this.state.columns.reduce((acc, item, index) => {
        return (acc = item.columnName === sortObject.columnName ? index : acc);
      }, 0);
      //spreading options and changing sorted item
      this.setState({
        columns: this.state.columns.map((item, index) => {
          return index === sortIndex
            ? {
                ...item,
                ...sortObject
              }
            : item;
        })
      });
    };

    //spreading object options
    this.changeColumnWidths = widths => {
      this.setState({
        columns: widths.map((item, index) => ({
          ...this.state.columns[index],
          ...item
        }))
      });
    };

    //picking last selected item
    this.changeSelection = selection => {
      console.log(selection[selection.length - 1]);
      // console.log(this.props.onSelectChange)
      if (this.props.onSelectChange && this.props.mainTable) {
        this.props.onSelectChange(
          this.getDBId(selection[selection.length - 1])
        );
      }
      this.setState({ selection: [selection[selection.length - 1]] });
    };
  }
  getRowId = row => {
    // this.setState({
    //   selectedID: this.props.options.idfield.reduce((acc, field) => {
    //     return (acc = { ...acc, [field]: row[field] });
    //   }, {})})
    return this.props.options.idfield.reduce((acc, field) => {
      return (acc = { ...acc, [field]: row[field] });
    }, {});
    // });
  };
  changeAddedRows = addedRows => {
    const initialized = addedRows.map(row =>
      Object.keys(row).length ? row : {}
    );
    this.setState({ addedRows: initialized });
  };

  changeEditingRowIds = editingRowIds => {
    this.setState({ editingRowIds });
  };

  changeRowChanges = rowChanges => {
    this.setState({ rowChanges });
  };
  getDBId = rowid => {
    return this.props.options.idfield.reduce((acc, field) => {
      return (acc = {
        ...acc,
        [field]: this.state.rows[rowid] ? this.state.rows[rowid][field] : 0
      });
    }, {});
  };
  commitChanges = ({ added, changed, deleted }) => {
    let { rows } = this.state;
    if (added) {
      //insert here
      (async () => {
        let response = await fetch(`${URL}/db/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            table: this.props.table,
            fields: added
          })
        });
        let data = await response.json();
        rows = [...rows, ...data];
        this.setState({ rows });
      })();
    }
    if (changed) {
      //update
      // console.log(changed);
      // console.log(this.getDBId(Object.keys(changed)[0]));
      // (async () => {
      //   let response = await fetch(`${URL}/db/`, {
      //     method: "PUT",
      //     headers: {
      //       "Content-Type": "application/json"
      //     },
      //     body: JSON.stringify({
      //       id:this.getDBId(Object.keys(changed)[0])
      //       table: this.props.table,
      //       fields: Object.values(changed)[0]
      //     })
      //   });
      //   let data = await response.json();
      //   rows = rows.map(row =>
      //     changed[row[this.props.options.idfield]] ? data[0] : row
      //   );
      //   this.setState({ rows });
      // })();
    }
    if (deleted) {
      //delete
      (async () => {
        let response = await fetch(`${URL}/db/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: this.getDBId(deleted[0]),
            table: this.props.table
          })
        });
        let data = await response.json();
        console.log(data);
        rows = rows.filter(
          row => row[this.props.options.idfield] !== deleted[0]
        );
        this.setState({ rows });
      })();
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedItem !== this.props.selectedItem) {
      (async () => {
        let response = "";
        if (this.props.mainTable) {
          response = await fetch(`${URL}/db/${this.props.table}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              ...this.props.options.request
            })
          });
        } else {
          response = await fetch(`${URL}/db/${this.props.table}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              ...this.props.options.request,
              filter: { ...this.props.selectedItem }
            })
          });
        }
        let rows = await response.json();
        if (this.props.table === "filmsscriptwriters") {
          console.log(this.state.rows);
        }
        this.setState({ rows });
      })();
      this.forceUpdate();
    }
  }
  componentDidMount() {
    (async () => {
      let response = "";
      if (this.props.mainTable) {
        response = await fetch(`${URL}/db/${this.props.table}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            ...this.props.options.request
          })
        });
      } else {
        response = await fetch(`${URL}/db/${this.props.table}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...this.props.options.request,
            filter: { ...this.props.selectedItem }
          })
        });
      }
      let data = await response.json();
      const { options } = this.props;
      this.setState({
        rows: data,
        ...options
      });
    })();
  }
  render() {
    const {
      rows,
      columns,
      pageSizes,
      editingRowIds,
      rowChanges,
      addedRows,
      selection
    } = this.state;
    const ToolbarHeader = ({ children, row, ...restProps }) => (
      <Toolbar.Root row={row} {...restProps}>
        <h4>{this.props.name}</h4>
      </Toolbar.Root>
    );
    return (
      // <Grid rows={rows} columns={columns} getRowId={getRowId}>
      <Grid
        rows={rows}
        columns={columns}
        // getRowId={this.getRowId}
      >
        <SortingState sorting={columns} onSortingChange={this.changeSorting} />
        <IntegratedSorting />
        <PagingState defaultCurrentPage={0} defaultPageSize={5} />
        <IntegratedPaging />
        <EditingState
          editingRowIds={editingRowIds}
          onEditingRowIdsChange={this.changeEditingRowIds}
          rowChanges={rowChanges}
          onRowChangesChange={this.changeRowChanges}
          addedRows={addedRows}
          onAddedRowsChange={this.changeAddedRows}
          onCommitChanges={this.commitChanges}
          columnExtensions={columns}
        />
        <SelectionState
          selection={selection}
          onSelectionChange={this.changeSelection}
        />
        <Table columnExtensions={columns} messages={tableMessages} />
        <TableColumnResizing
          columnWidths={columns}
          onColumnWidthsChange={this.changeColumnWidths}
          minColumnWidth={40}
        />
        <Toolbar rootComponent={ToolbarHeader} searchPanel columnChooser />
        <TableHeaderRow showSortingControls />
        <TableEditRow cellComponent={EditCell} />
        <TableSelection
          selectByRowClick
          highlightRow
          showSelectionColumn={false}
        />
        <TableEditColumn
          showAddCommand={!addedRows.length}
          showEditCommand
          showDeleteCommand
          commandComponent={Command}
        />
        <PagingPanel pageSizes={pageSizes} messages={pagingPanelMessages} />
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Demo);
