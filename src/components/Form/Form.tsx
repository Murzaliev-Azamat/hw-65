import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axiosApi from "../../axiosApi";
import {Page} from "../../types";
import PAGES from "../../pages";
import Spinner from "../Spinner/Spinner";

interface FormMutation {
  title: string;
  content: string;
  name: string;
}

const Form: React.FC = () => {
  const [page, setPage] = useState<FormMutation>({name: '', title: '', content: ''});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setPage(prev => ({
      ...prev,
      [name]: value,
    }))
  };

  const fetchPage = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get<Page>('/pages/' + page.name.toLowerCase() + '.json');
      const selectedPage = {
        ...response.data,
        name: page.name,
      }
      setPage(selectedPage);
    } finally {
      setLoading(false);
    }
  },[page.name])

  useEffect(() => {
    fetchPage().catch(console.error);
  },[fetchPage]);

  const updatePage = async (updatedPage: Page) => {
    setLoading(true);

    try {
      setLoading(true);
      await axiosApi.put("/pages/" + page.name.toLowerCase() + '.json', updatedPage);
      navigate('/pages/' + page.name.toLowerCase());
    } finally {
      setLoading(false);
    }
  };

  const updatedPage = {
    title: page.title,
    content: page.content,
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void updatePage(updatedPage);
  }

  return (
    <div>
      {loading ? <Spinner/> : (
          <form onSubmit={onFormSubmit}>
            <select name="name" value={page.name} onChange={onTextFieldChange}>
              <option value=''></option>
              {PAGES.map((page) => (
                  <option key={page} value={page}>{page}</option>
              ))}
            </select>
            <input
                className="d-block mt-2"
                type="text"
                name="title"
                placeholder="Введите заголовок"
                value={page.title}
                onChange={onTextFieldChange}
            />
            <textarea
                className="d-block mt-2"
                name="content"
                placeholder="Введите сообщение"
                value={page.content}
                onChange={onTextFieldChange}
            />
            <button type="submit" className="d-block btn btn-primary mt-2">Save</button>
          </form>
      )}
    </div>
  );
};

export default Form;