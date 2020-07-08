import React from "react";
import {useSearchFilter} from "../../hooks/datatable/useSearchFilter";
import {makeStyles} from "@material-ui/core/styles";
import {createStyles, Grid, Theme} from "@material-ui/core";
import {BaseDataTable} from "./BaseDataTable";
import {userService} from "../../services/UserService";
import {IListedUser} from "../../types/IUser";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import BlockIcon from '@material-ui/icons/Block';
import {useSnackbarFeedback} from "../../hooks/useSnackbarFeedback";

const useStyle = makeStyles((theme: Theme) => createStyles({
  root: {
    width: "100%"
  },
  filter: {
    margin: 10,
  },
  table: {
    width: "100%",
    margin: 20
  }
}));

export function UsersAdminTable() {
  const [searchUsername, usernameFilter] = useSearchFilter({
    name: 'username',
    placeholder: '用户名'
  });
  const classes = useStyle();
  const tableRef = React.useRef(null);
  const {success, successBar, fail, failBar} = useSnackbarFeedback();

  return (
    <>
      {successBar}
      {failBar}
      <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.filter}>
          {usernameFilter}
        </Grid>
        <Grid item xs={12} className={classes.table}>
          <BaseDataTable<IListedUser>
            title={'用户管理'}
            tableRef={tableRef}
            filterOptions={searchUsername.value ? {
              search: {
                by: 'username',
                value: searchUsername.value as string
              }
            } : {}}
            dataSource={userService}
            columns={[
              {
                title: '用户名',
                field: 'username'
              },
              {
                title: '邮箱',
                field: 'email'
              },
              {
                title: '状态',
                field: 'status',
                lookup: {
                  'active': '正常',
                  'disabled': '已禁用'
                }
              },
              {
                title: '管理员',
                field: 'admin',
              },
              {
                title: '注册时间',
                field: 'createAt'
              }
            ]}
            options={{
              selection: true,
              selectionProps: (rowData: IListedUser) => ({
                disabled: rowData.admin === '是'
              }),
            }}
            actions={[
              {
                icon: () => <BlockIcon/>,
                tooltip: '禁用用户',
                onClick: (event, data) => {
                  if ('length' in data) {
                    const doit = async () => {
                      try {
                        const reqs = data.map(value => userService.patch(value.id, {
                          status: "disabled"
                        }));
                        await Promise.all(reqs);
                      } catch (e) {
                        fail(e);
                      }
                      if (tableRef.current) {
                        // @ts-ignore
                        tableRef.current.onQueryChange();
                        success();
                      }
                    }
                    doit();
                  }
                }
              },
              {
                icon: () => <VerifiedUserIcon/>,
                tooltip: '启用用户',
                onClick: (event, data) => {
                  if ('length' in data) {
                    const doit = async () => {
                      try {
                        const reqs = data.map(value => userService.patch(value.id, {
                          status: "active"
                        }));
                        await Promise.all(reqs);
                      } catch (e) {
                        fail(e);
                      }
                      if (tableRef.current) {
                        // @ts-ignore
                        tableRef.current.onQueryChange();
                        success();
                      }
                    }
                    doit();
                  }
                }
              }
            ]}
          />
        </Grid>
      </Grid>
    </>
  )
}
