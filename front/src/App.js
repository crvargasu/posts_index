import "./App.css";
import { Table, Input, Row, Button, Col, Form } from "antd";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);

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
        <button onClick={() => deleteItem(record)}>{"Eliminar"}</button>
      ),
    },
  ];

  useEffect(() => {
    fetchPosts();
  }, []);


  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:7071/posts");
    return setPosts(res.data);
  };

  async function postData(values) {
    await axios.post(`http://localhost:7071/posts`, {
      name: values.name,
      description: values.description,
    });
    fetchPosts();
  }

  async function deleteItem(record) {
    console.log(record.id);
    await axios.delete(`http://localhost:7071/posts/${record.id}`);
    fetchPosts();
  }

  async function searchName(item) {
    if(item.name === '') return fetchPosts()
    const res = await axios.get("http://localhost:7071/posts");
    const filtered = res.data.filter((post) => post.name.includes(item.name));
    setPosts(filtered);
  };

  return (
    <Wrapper>
      <SearchDiv>
        <Form style={{ display: "flex" }} onFinish={searchName}>
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
        <Form style={{ display: "flex" }} onFinish={postData}>
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
`;

const SearchDiv = styled.div`
  display: flex;
`;

const CreateDiv = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
`;

export default App;
