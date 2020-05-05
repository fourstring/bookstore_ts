import React, {useState} from "react";
import {BaseService} from "../services/BaseService";
import {IEntity} from "../types/IEntity";
import {Pagination} from "@material-ui/lab";
import {IRequestFilterOptions} from "../services/ServiceInterfaces";
import {useEntities} from "../hooks/useEntities";
import {CircularProgress} from "@material-ui/core";

export function PagedView<T extends IEntity, InputT = T, R = T>(props: React.PropsWithChildren<{
  dataSource: BaseService<T, InputT, R>,
  filter: Omit<Partial<IRequestFilterOptions>, 'page'>,
  children: (data: Map<number, T>, paginator: JSX.Element) => any
}>) {
  const [page, setPage] = useState(1); // Pagination component is 1-indexed.
  const {entities, error, loading, page: pageInfo} = useEntities<T, InputT, R>(props.dataSource, {
    page: page - 1,
    ...props.filter
  });
  const paginator = <Pagination showFirstButton
                                showLastButton
                                onChange={(event, page1) => setPage(page1)}
                                page={page}
                                variant="outlined"
                                shape="rounded"
                                count={pageInfo?.totalPages}
  />;
  return (
    <>
      {loading && <CircularProgress/>}
      {!loading && props.children(entities, paginator)}
    </>
  );
}
