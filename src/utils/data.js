const columns = ["Edit", "Id", "Name", "Email", "Gender", "Status", "Delete"];

const columns_1 = [
    { key: 'id', label: 'Id:' },
    { key: 'name', label: 'Name:' },
    { key: 'email', label: 'Email:' },
    { key: 'gender', label: 'Gender:' },
    { key: 'status', label: 'Status:' },
  ];

const columns_2 = ["Id","Name","Emails"]

const user = {
    dashboard:'Dashboard',
    id:'Id',
    name:'Name',
    email:'Email'
}

const adduser = {
    name:'Name:',
    email:'Email:',
    gender:'Gender:',
    status:'Status:',
    update:'Update',
    cancel:'Cancel'
}

const genderOptions = [
    { value: '', label: 'select' },
    { value: 'male', label: 'male' },
    { value: 'female', label: 'female' },
  ];

const statusOptions = [
    { value: '', label: 'select' },
    { value: 'active', label: 'active' },
    { value: 'inactive', label: 'inactive' },
  ];

const headers = {
    headers: {
      Authorization: `Bearer 7ba28fd99cf99393c57d796ef80869a17bb6fb2b1d9d21ff02de0ed0711489c7`,
    },
};

  
const offcanvasTitleText = ["offcanvas","Add New User"];

const number = [1,10];

const access = ["previous","next","Edit User","User Details","Add User"];

export {columns, columns_1,columns_2,user,adduser,genderOptions,statusOptions,headers,offcanvasTitleText,access,number};
