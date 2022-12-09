import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axiosApi from "../../axiosApi";
import {Page} from "../../types";
import Spinner from "../Spinner/Spinner";

const PageView = () => {
  const {pageName} = useParams();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPage = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get<Page>(`/pages/${pageName}.json`);
      const page = response.data;
      setPage(page);
    } finally {
      setLoading(false);
    }
  },[pageName]);

  useEffect(() => {
    void fetchPage();
  }, [fetchPage]);

  let info = (
    <div>
      <h3>{page?.title}</h3>
      <p>{page?.content}</p>
    </div>
  );

  if (loading) {
    info = <Spinner/>
  }

  return (
    <>
      {info}
    </>
  );
};

export default PageView;