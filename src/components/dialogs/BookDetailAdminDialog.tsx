import React, {useEffect} from "react";
import {IBook} from "../../types/IBook";
import {
  Button,
  CircularProgress,
  createStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  Theme,
  Typography
} from "@material-ui/core";
import {EntityStateActionType, MutateMethods, useEntity} from "../../hooks/useEntity";
import {bookService} from "../../services/BookService";
import {makeStyles} from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Field, Formik} from "formik";
import {TextField} from "formik-material-ui";
import {BookBasicSchema} from "../../utils/validation_schemas/BookBasicSchema";
import {useFileUploader} from "../../hooks/useFileUploader";
import {Image} from "../Image";
import {readFileAsDataURL} from "../../utils/fileUtils";


const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
      padding: 20
    },
    field: {
      marginTop: 10,
      marginBottom: 10
    },
    titleBar: {
      background:
        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  }
))


export function BookDetailAdminDialog(props: React.PropsWithRef<{
  bookId: number,
  open: boolean,
  onClose: () => void
}>) {
  const {data, error, loading, mutating, issueMutate} = useEntity<IBook>(props.bookId, bookService);
  const classes = useStyles();
  const [coverPic, coverPicSelector, clearSelectedPic] = useFileUploader('选择封面图片');
  const coverPicRef = React.createRef<HTMLImageElement>();

  function handleCoverPicUpload() {
    async function doUpload() {
      if (coverPic) {
        let result = await bookService.updateCoverPic(props.bookId, coverPic);
        if (coverPicRef.current) {
          coverPicRef.current.src = bookService.getCoverPicUrl(props.bookId) + `?time=${(new Date()).getTime()}`;
          clearSelectedPic();
        }
      }
    }

    doUpload();
  }

  function handleClearCoverPic() {
    if (coverPicRef.current) {
      coverPicRef.current.src = bookService.getCoverPicUrl(props.bookId);
      clearSelectedPic();
    }
  }

  useEffect(() => {
    async function updateImg() {
      if (coverPic && coverPicRef.current) {
        let dataUrl = await readFileAsDataURL(coverPic);
        coverPicRef.current.src = dataUrl;
      }
    }

    updateImg();
  }, [coverPic]);

  return (
    <>
      <Dialog open={props.open} onClose={props.onClose}>
        {
          loading && <>
            <DialogTitle>
              <Typography>
                加载中...
              </Typography>
            </DialogTitle>
            <DialogContent>
              <CircularProgress/>
            </DialogContent>
          </>
        }
        {
          !loading && <>
            <DialogTitle>
              <Typography>
                {data?.title}
              </Typography>
            </DialogTitle>
            <DialogContent className={classes.root}>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                  <Typography>
                    基本信息
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Formik
                    initialValues={{
                      title: data?.title,
                      author: data?.author,
                      isbn: data?.isbn,
                      price: data?.price,
                      stock: data?.stock
                    }}
                    onSubmit={async values => {
                      issueMutate({
                        id: props.bookId,
                        data: values,
                        method: MutateMethods.PATCH
                      });
                    }}
                    validationSchema={BookBasicSchema}
                  >
                    {({submitForm, isSubmitting, resetForm}) => {
                      return (<Grid container direction={"column"} alignItems={"stretch"}>
                        <Field
                          name={"title"}
                          label={"标题"}
                          component={TextField}
                          className={classes.field}
                        />
                        <Field
                          name={"author"}
                          label={"作者"}
                          component={TextField}
                          className={classes.field}
                        />
                        <Field
                          name={"isbn"}
                          label={"ISBN"}
                          component={TextField}
                          className={classes.field}
                        />
                        <Field
                          name={"price"}
                          label={"单价"}
                          type={"number"}
                          component={TextField}
                          className={classes.field}
                        />
                        <Field
                          name={"stock"}
                          label={"库存"}
                          type={"number"}
                          component={TextField}
                          className={classes.field}
                        />
                        <Grid item container direction={"row"} justify={"space-around"}>
                          <Button color={"primary"} variant={"contained"} onClick={() => submitForm()}>
                            修改基本信息
                          </Button>
                          <Button color={"secondary"} variant={"contained"} onClick={() => resetForm()}>
                            重置
                          </Button>
                        </Grid>
                      </Grid>)
                    }}
                  </Formik>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                  <Typography>
                    详细描述
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Formik
                    initialValues={{
                      content: data?.description
                    }}
                    onSubmit={
                      async values => {
                        issueMutate({
                          mutator: async (dispatch) => {
                            try {
                              let result = await bookService.updateDescription(props.bookId, values.content as string);
                              dispatch({type: EntityStateActionType.SET_DATA, data: result});
                            } catch (e) {
                              dispatch({type: EntityStateActionType.ERROR, error: e});
                            }
                          }
                        });
                      }
                    }>
                    {({submitForm, resetForm}) => {
                      return (
                        <Grid container direction={"column"} alignItems={"stretch"}>
                          <Field
                            name={"content"}
                            label={"详细描述"}
                            multiline
                            rowsMax={10}
                            component={TextField}
                            className={classes.field}
                          />
                          <Grid item container direction={"row"} justify={"space-around"}>
                            <Button color={"primary"} variant={"contained"} onClick={() => submitForm()}>
                              修改详细描述
                            </Button>
                            <Button color={"secondary"} variant={"contained"} onClick={() => resetForm()}>
                              重置
                            </Button>
                          </Grid>
                        </Grid>
                      )
                    }}
                  </Formik>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                  <Typography>
                    封面图片
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid container direction={"row"} spacing={1}>
                    <Grid item xs={12} md={9}>
                      <GridList cellHeight={"auto"} cols={1}>
                        <GridListTile>
                          <Image
                            src={bookService.getCoverPicUrl(props.bookId)}
                            alt={data?.title as string}
                            width={400}
                            ref={coverPicRef}
                          />
                          {coverPic && <GridListTileBar
                            titlePosition="top"
                            title={"您正在查看新封面预览"}
                            className={classes.titleBar}
                          />}
                        </GridListTile>
                      </GridList>
                    </Grid>
                    <Grid item xs={12} md={3} container direction={"column"} alignItems={"stretch"}>
                      {coverPicSelector}
                      <Button
                        color={"primary"}
                        variant={"contained"}
                        onClick={handleCoverPicUpload}
                        className={classes.field}
                      >
                        上传封面图片
                      </Button>
                      {coverPic &&
                      <Button
                        color={"primary"}
                        variant={"outlined"}
                        onClick={handleClearCoverPic}
                        className={classes.field}
                      >
                        清除选择
                      </Button>
                      }
                    </Grid>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </DialogContent>
          </>
        }
      </Dialog>
    </>
  )
}
