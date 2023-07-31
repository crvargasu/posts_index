import { Table, Input, Row, Button, Col, Form } from "antd";
import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, createPost, deletePost } from "./reducers/postSlice";

function Post() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.data);

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Acción",
      key: "key",
      dataIndex: "key",
      render: (_, record) => (
        <Button onClick={() => deleteItem(record)}>{"Eliminar"}</Button>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  async function postData(values) {
    await dispatch(createPost(values));
  }

  async function deleteItem(record) {
    await dispatch(deletePost(record.id));
  }

  async function searchName(item) {
    if (item.name === '') {
      dispatch(fetchPosts());
    } else {
      dispatch(fetchPosts(item.name));
    }
  }

  return (
    <Wrapper>
      <SearchDiv>
        <Form wrapperCol={{ span: 20 }} style={{ display: "flex" }} onFinish={searchName}>
          <Form.Item name="name">
            <Input placeholder="Filtro de Nombre" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Buscar
            </Button>
          </Form.Item>
        </Form>
      </SearchDiv>
      <Table dataSource={posts} columns={columns} pagination={false} />
      <CreateDiv>
        <Form wrapperCol={{ span: 20 }} style={{ display: "flex" }} onFinish={postData}>
          <Form.Item name="name">
            <Input placeholder="Nombre" />
          </Form.Item>
          <Form.Item name="description">
            <Input placeholder="Descripción" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Crear
            </Button>
          </Form.Item>
        </Form>
      </CreateDiv>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
  margin-top: 50px;
`;

const SearchDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const CreateDiv = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

export default Post;