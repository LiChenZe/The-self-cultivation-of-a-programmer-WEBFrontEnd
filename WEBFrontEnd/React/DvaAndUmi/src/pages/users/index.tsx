import React, { useState, FC } from 'react'
import { Table, Tag, Space, Popconfirm, Button } from 'antd';
import { connect, Dispatch, UserState, Loading } from 'umi'
import UserModal from './components/UserModal'

interface UserPageProps {
    users: UserState,
    dispatch: Dispatch,
    userListLoading: Boolean,
}
const index: FC<UserPageProps> = ({ users, dispatch, userListLoading }) => {

    const { data } = users;
    const [modalVisible, setModalVisible] = useState(false);
    const [record, setRecord] = useState({});

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Create_Time',
            dataIndex: 'create_time',
            key: 'create_time',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    {/* 此处注意使用函数的方式,来执行 editModalVisible */}
                    <a onClick={() => { editModalVisible(record) }}>Edit</a>
                    <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={() => {
                            confirm(record);
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a>Delete</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // 删除逻辑
    const confirm = (record) => {
        console.log(record);
        dispatch({
            type: 'users/delRecord',
            payload: {
                record,
            }
        })
    }

    const editModalVisible = (record) => {
        setModalVisible(true);
        setRecord(record);
    }

    // 添加按钮
    const addHandler = () => {
        setModalVisible(true);
        setRecord({});
    }
    // 修改逻辑&添加逻辑;
    const onFinish = values => {


        dispatch({
            type: 'users/addRecord',
            payload: {
                values: values,
            }
        })

        if (record) {
            console.log('users/editRecord');
            dispatch({
                type: 'users/editRecord',
                payload: {
                    values: values,
                    id: record.id
                }
            })
        } else {
            console.log('users/addRecord');
            dispatch({
                type: 'users/addRecord',
                payload: {
                    values: values,
                }
            })
        }
        setModalVisible(false);
    }


    return (
        <div className="list-table">
            <Button type="primary" onClick={addHandler}>Add</Button>
            {/* rowKey需要定义否则将警告定义key */}
            <Table columns={columns} dataSource={data} rowKey='id' loading={userListLoading} />
            <UserModal visible={modalVisible} onFinish={onFinish} onOk={() => { setModalVisible(false) }} onCancel={() => { setModalVisible(false) }} record={record}></UserModal>
        </div>
    )
}

// 这种定义和 FC<UserPageProps> 的泛型定义类似;
const mapStateToProps = ({ users, loading } : {users: UserState, loading: Loading}) => {
    return {
        users,
        userListLoading: loading.models.users
    }
}

export default connect(mapStateToProps)(index);
