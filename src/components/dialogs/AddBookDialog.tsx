import React, {useEffect} from "react";
import {useFileUploader} from "../../hooks/useFileUploader";
import {useSnackbarFeedback} from "../../hooks/useSnackbarFeedback";
import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  LinearProgress,
  Theme,
  Typography
} from "@material-ui/core";
import {Field, Formik} from "formik";
import {NewBookSchema} from "../../utils/validation_schemas/NewBookSchema";
import {TextField} from "formik-material-ui";
import {makeStyles} from "@material-ui/core/styles";
import {Image} from "../Image";
import {bookService} from "../../services/BookService";
import {readFileAsDataURL} from "../../utils/fileUtils";
import nocover from "../../static/nocover.jpeg";

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

export function AddBookDialog(props: React.PropsWithRef<{
  open: boolean,
  onClose: () => void
}>) {
  const [coverPic, coverPicSelector, clearSelectedPic] = useFileUploader('选择封面图片');
  const coverPicRef = React.useRef<HTMLImageElement>(null);
  const {success, successBar, fail, failBar} = useSnackbarFeedback();
  const classes = useStyles();


  function handleClearCoverPic() {
    if (coverPicRef.current) {
      coverPicRef.current.src = nocover;
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
      {successBar}
      {failBar}
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>
          <Typography>
            添加新书籍
          </Typography>
        </DialogTitle>
        <Formik
          initialValues={{
            title: '',
            author: '',
            isbn: '',
            price: 0,
            stock: 0,
            content: ''
          }}
          onSubmit={async values => {
            const {content, ...basicInfo} = values;
            if (!coverPic) {
              fail('请选择封面图片！');
              return;
            }
            try {
              const newBook = await bookService.post(basicInfo);
              try {
                await bookService.updateDescription(newBook.id, content);
                await bookService.updateCoverPic(newBook.id, coverPic);
                if (coverPicRef.current) {
                  coverPicRef.current.src = bookService.getCoverPicUrl(newBook.id);
                }
              } catch (e) {
                await bookService.delete(newBook.id);
                fail(e);
                return;
              }
            } catch (e) {
              fail(e);
              return;
            }
            clearSelectedPic();
            success();
          }}
          validationSchema={NewBookSchema}
        >
          {({submitForm, isSubmitting, resetForm}) => {
            return (
              <>
                <DialogContent>
                  {
                    isSubmitting && <LinearProgress/>
                  }
                  <Grid container direction={'column'} alignItems={"stretch"}>
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
                    <Field
                      name={"content"}
                      label={"详细描述"}
                      multiline
                      rowsMax={10}
                      component={TextField}
                      className={classes.field}
                    />
                    <Grid container direction={"row"} spacing={1} justify={"center"}>
                      <Grid item xs={12} md={9}>
                        <GridList cellHeight={"auto"} cols={1}>
                          <GridListTile>
                            <Image
                              src={nocover}
                              alt={''}
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
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Grid item container direction={"row"} justify={"space-around"}>
                    <Button color={"primary"} variant={"contained"} onClick={() => submitForm()}>
                      新增书籍
                    </Button>
                    <Button color={"secondary"} variant={"contained"} onClick={() => resetForm()}>
                      重置
                    </Button>
                  </Grid>
                </DialogActions>
              </>
            )
          }
          }
        </Formik>
      </Dialog>
    </>
  )
}
