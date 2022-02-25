<template>
  <div>
    <!-- 功能 -->
    <div class="header-menu">
      <el-input placeholder="搜索用户" v-model="keyword" @clear="inputListener" clearable>
        <el-button slot="append" type="primary" icon="el-icon-search" @click="searchStudent">搜索</el-button>
      </el-input>
<!--      <el-select v-model="value1" placeholder="年级" @change="queryClass" @clear="gradeListener" clearable>-->
<!--        <el-option v-for="item in grade" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
<!--      </el-select>-->
<!--      <el-select v-model="value2" placeholder="班级" @change="queryStudentByClass" @clear="classListener" clearable>-->
<!--        <el-option-->
<!--          v-for="item in classNo"-->
<!--          :key="item.value"-->
<!--          :label="item.label"-->
<!--          :value="item.value"-->
<!--        ></el-option>-->
<!--      </el-select>-->
      <el-button type="primary" @click="addStudent()" class="addbtn">添加用户</el-button>
    </div>
    <!-- 数据显示 -->
    <el-table :data="studentData" size="mini" :stripe="true" :highlight-current-row="true">
      <el-table-column label="序号" type="selection"></el-table-column>
<!--       <el-table-column prop="id" label="ID"></el-table-column>-->
<!--      <el-table-column prop="studentNo" label="学号" fixed width="100"></el-table-column>-->
      <el-table-column prop="realname" label="姓名" fixed width="100"></el-table-column>
      <el-table-column prop="username" label="昵称" ></el-table-column>
<!--      <el-table-column prop="grade" label="年级" fixed width="100"></el-table-column>-->
<!--      <el-table-column prop="classNo" label="班级" fixed width="100"></el-table-column>-->
      <el-table-column prop="age" label="年龄" ></el-table-column>
      <el-table-column prop="telephone" label="电话" ></el-table-column>
      <el-table-column prop="email" label="邮件" ></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="roles" label="权限">
        <template slot-scope="scope">
          <el-tag type="success">{{scope.row.roles}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="国籍">
        <template slot-scope="scope">
          <svg-icon style="width: 3em;height: 3em;" :icon-class="scope.row.remark"></svg-icon>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" fixed="right" width="180">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-setting" size="mini" @click="resetById(scope.$index, scope.row)">重置密码</el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteById(scope.$index, scope.row)"></el-button>
          <el-button type="primary" icon="el-icon-edit" circle @click="editById(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出表单编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="visibleForm">
      <el-form
        :model="editFormData"
        label-position="left"
        label-width="80px"
        :rules="editFormRules"
      >
        <el-form-item label="ID">
          <el-input v-model="editFormData.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editFormData.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realname">
          <el-input v-model="editFormData.realname" autocomplete="off"></el-input>
        </el-form-item>
<!--        <el-form-item label="年级" prop="grade">-->
<!--          <el-input v-model="editFormData.grade" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="班级" prop="classNo">-->
<!--          <el-input v-model="editFormData.classNo" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="手机" prop="telephone">
          <el-input v-model="editFormData.telephone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮件" prop="email">
          <el-input v-model="editFormData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="editFormData.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="editFormData.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="roles">
          <el-radio-group v-model="editFormData.roles">
            <el-radio-button label="admin">辅导员</el-radio-button>
            <el-radio-button  label="normal">学生</el-radio-button>
            <el-radio-button  label="ban">封禁用户</el-radio-button>
            <el-radio-button  label="other">其他用户</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="学院" prop="groupId">
          <el-select v-model="editFormData.groupId" placeholder="" >
            <el-option v-for="item in groups"
                       :key="item.id" :label="item.remark" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleForm = false">取 消</el-button>
        <el-button type="primary" @click="commit()">提 交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加用户" :visible.sync="visibleAddForm">
      <el-form
              :model="addFormdata"
              label-position="left"
              label-width="80px"
              :rules="editFormRules"
      >
        <!--        <el-form-item label="学号">-->
        <!--          <el-input v-model="addFormdata.studentNo" autocomplete="off"></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addFormdata.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realname">
          <el-input v-model="addFormdata.realname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="telephone">
          <el-input v-model="addFormdata.telephone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮件" prop="email">
          <el-input v-model="addFormdata.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="addFormdata.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="addFormdata.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="groupId">
          <el-select v-model="addFormdata.groupId" placeholder="" >
            <el-option v-for="item in groups"
                       :key="item.id" :label="item.remark" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限" prop="roles">
          <el-radio-group v-model="addFormdata.roles">
            <el-radio-button label="admin">辅导员</el-radio-button>
            <el-radio-button  label="normal">学生</el-radio-button>
            <el-radio-button  label="ban">封禁用户</el-radio-button>
            <el-radio-button  label="other">其他用户</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleAddForm = false">取 消</el-button>
        <el-button type="primary" @click="addCommit()">提 交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="验证超级密码" :visible.sync="visiblePassForm">
      <el-form
              :model="passData"
              label-position="left"
              label-width="80px">
        <el-form-item label="超级密码" prop="spass">
          <el-input type="password" v-model="passData.spass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visiblePassForm = false">取 消</el-button>
        <el-button type="primary" @click="vertifypass()">提 交</el-button>
      </div>
    </el-dialog>

    <!-- 上一页，当前页，下一页 -->
    <div class="footer-button">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
  import {add,getUsers,search,modify} from "@/api/user";
  import {get} from "@/api/group";

  export default {
  name: "UserList",
  data() {
    return {
      studentData: [],
      passData:{
        spass:''
      },
      editFormData: [],
      addFormdata:{
        userId: "",
        username: "",
        realname: "",
        idno: "",
        description: "",
        telephone: "",
        email:"",
        address: "",
        age: "",
        roles:"normal"
      },
      visiblePassForm: false,
      visibleAddForm: false,
      keyword: "",
      page: 1,
      pageSize: 10,
      total: 0,
      value1: "", // 年级
      value2: "", // 班级
      groups:[],
      visibleForm: false,
      editFormRules: {
        username: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        realname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        telephone: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮件", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
      }
    };
  },

  mounted() {
    this.allStudent();
    this.getGroup();
  },

  methods: {
    getGroup(){
      get(1,20).then(res=>{
        this.groups = res.data.records
        console.log(this.groups)
      })
    },
    addStudent() {
      this.visibleAddForm = true;
    },
    addCommit() {
      console.log(this.addFormdata);
      add(this.addFormdata)
        .then(res => {
          if (res.code == 0) {
            this.visibleAddForm = false;
            this.$message({ message: "添加用户成功", type: "success" });
          }
        })
        .catch(error => {
          this.$message.error("添加用户失败");
        });
    },
    // 清空年级回到查询所有用户
    gradeListener() {
      this.allStudent()
      this.value2 = ''
    },

    // 清空班级回到查询所有班级
    classListener() {

    },

    // 查询班级信息
    // queryClass() {
    //   this.$axios
    //     .get("http://localhost:8080/class-grade/" + this.value1)
    //     .then(res => {
    //       let ret = res.data.data
    //       this.classNo.splice(0, this.classNo.length)
    //       this.value2 = ""
    //       ret.map(v => {
    //         this.classNo.push({
    //           value: v.classNo,
    //           label: v.className
    //         });
    //       });
    //     })
    //     .catch(error => {
    //
    //     });
    // },

    // 根据班级查询用户信息
    // queryStudentByClass() {
    //   this.$axios
    //     .get(
    //       "http://localhost:8080/student-class/" + this.page + "/" + this.value2
    //     )
    //     .then(res => {
    //       console.log(res)
    //       if (res.data.code == 0) {
    //         let ret = res.data.data
    //         this.studentData = ret.records
    //         this.total = ret.total
    //       }
    //     })
    //     .catch(error => {
    //
    //     });
    // },

    /***
     * 编辑提交
     */
    commit() {
      if(this.editFormData.roles == 'admin'){
        //验证超级密码
        this.visibleForm = false
        this.visiblePassForm = true
        return ;
      }
      this.modifyStudent(this.editFormData)
    },

    vertifypass(){
      this.visiblePassForm = false
      if(this.passData.spass == this.$store.state.user.superpassword){
        this.modifyStudent(this.editFormData)
      }else{
        this.$message.error('超级密码错误！')
        this.allStudent()
      }
    },

    inputListener() {
      this.allStudent()
    },

    /**
     * 查询所有用户
     */
    allStudent() {
        console.log(this.page)
        getUsers(this.page).then(res => {
          let ret = res.data
          this.studentData = ret.records
          this.total = ret.total
          // this.$message({message:'查询成功', type: 'success'})
        })
        .catch(error => {
          this.$message.error("查询用户列表失败")
        });
    },

    /**
     * 关键字查询用户
     */
    searchStudent() {
      search(this.keyword)
        .then(res => {
          let ret = res.data
          this.studentData = ret.records
          this.total = ret.total
          this.$message({ message: "查询成功", type: "success" })
        })
        .catch(error => {
          this.$message.error("查询失败")
        });
    },

    resetById(index, row) {
      this.resetPassword(row.id);
    },

    resetPassword(id){
      modify({"id":id,"password":"123456"})
        .then(res => {
          this.$message({ message: "重置密码成功", type: "success" });
        })
        .catch(error => {
          this.$message.error("重置密码失败");
        });
    },

    /**
     * 根据id删除用户
     */
    deleteById(index, row) {
      this.deleteStudentById(row.id)
    },

    deleteStudentById(id) {
      modify({"id":id, "deleted":1})
        .then(res => {
          this.$message({ message: "删除成功", type: "success" })
          this.allStudent()
        })
        .catch(error => {
          this.$message.error("删除失败")
        });
    },

    /**
     * 编辑用户
     */
    editById(index, row) {
      let modifyId = row.id
      this.editFormData = row
      this.visibleForm = true
    },

    /**
     * 更新用户
     */
    modifyStudent(modifyData) {
      modify(modifyData)
        .then(res => {
          this.$message({ message: "更新成功", type: "success" })
          this.allStudent()
          this.visibleForm = false
        })
        .catch(error => {
          this.$message.error("更新失败")
        });
    },

    handleSizeChange() {},

    handleCurrentChange(v) {
      this.page = v
      this.allStudent()
    }
  }
};
</script>

<style lang="less" scoped>
.el-input-group {
  width: 40%;
}
.header-menu {
  margin-bottom: 5px;
  padding: 5px;
  text-align: left;
  margin-bottom: 5px;
}

.footer-button {
  margin-top: 10px;
}

  .addbtn{
    margin-left: 5px;
  }
</style>
