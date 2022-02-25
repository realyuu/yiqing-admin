<template>
  <div>
    <!-- 功能 -->
    <div class="header-menu">
      <el-input class="header-search" placeholder="搜索健康打卡记录（学号）" v-model="keyword.keyword" style="width:20%;">
      </el-input>

      <el-select v-model="keyword.cough" placeholder="咳嗽" clearable>
        <el-option key="all" label="全部" value=" "></el-option>
        <el-option key="0" label="无" value="0"></el-option>
        <el-option key="1" label="有" value="1"></el-option>
      </el-select>

      <el-select v-model="keyword.fever" placeholder="发烧" clearable>
        <el-option key="all" label="全部" value=" "></el-option>
        <el-option key="0" label="无" value="0"></el-option>
        <el-option key="1" label="有" value="1"></el-option>
      </el-select>

      <el-select v-model="keyword.temperature" placeholder="体温" clearable>
        <el-option key="1" label="异常" value="37.2"></el-option>
      </el-select>

      <el-button class="header-search" slot="append" type="primary" icon="el-icon-search" @click="searchStudent">搜索
      </el-button>

      <el-button type="primary" @click="showAddForm()" class="addbtn">添加</el-button>

      <el-button class="header-search" type="primary" icon="el-icon-document" @click="handleDownload">
        导出Excel
      </el-button>

    </div>
    <!-- 数据显示 -->
    <el-table :data="studentData" size="mini" :stripe="true" :highlight-current-row="true">
      <el-table-column label="序号" type="selection"></el-table-column>
      <el-table-column prop="userId" label="学号" fixed width="100"></el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="dept" label="学院"></el-table-column>
      <el-table-column prop="major" label="班级"></el-table-column>
      <el-table-column prop="createTime" label="时间"></el-table-column>
      <el-table-column prop="type" label="时间段"></el-table-column>
      <el-table-column prop="visit" label="行程轨迹"></el-table-column>
      <el-table-column prop="temperature" label="体温">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.temperature>37.2" type="danger" effect="dark">{{scope.row.temperature}}</el-tag>
          <el-tag v-else plain>{{scope.row.temperature}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="cough" label="咳嗽">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.cough==0" plain>无</el-tag>
          <el-tag v-else-if="scope.row.cough==1" type="danger" effect="dark">有</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="fever" label="发烧">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.fever==0" plain>无</el-tag>
          <el-tag v-else-if="scope.row.fever==1" type="danger" effect="dark">有</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="operation" label="操作" fixed="right" width="220">
        <template slot-scope="scope">
          <!--      <el-button type="text" icon="el-icon-setting" size="mini" @click="resetById(scope.$index, scope.row)">重置密码</el-button>-->
          <!--          <el-button v-if="scope.row.status==0" type="success" icon="el-icon-check" circle-->
          <!--                     @click="statusById(scope.$index, scope.row, 1)"></el-button>-->
          <!--          <el-button v-if="scope.row.status==0" type="danger" icon="el-icon-close" circle-->
          <!--                     @click="statusById(scope.$index, scope.row, 2)"></el-button>-->
          <!--          <el-button v-if="role == 'normal'" type="primary" icon="el-icon-edit" circle-->
          <!--                     @click="showEditForm(scope.$index, scope.row)"></el-button>-->
          <el-button icon="el-icon-delete" circle @click="deleteById(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加" :visible.sync="visibleAddForm">
      <el-form
              :model="addFormdata"
              label-position="left"
              label-width="80px"
              :rules="editFormRules"
      >
        <el-form-item label="学号" prop="userId">
          <el-input v-model="addFormdata.userId"></el-input>
        </el-form-item>
        <el-form-item label="时间段" prop="type">
          <el-radio-group v-model="addFormdata.type">
            <el-radio-button label="上午">上午</el-radio-button>
            <el-radio-button label="中午">中午</el-radio-button>
            <el-radio-button label="下午">下午</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="行程轨迹" prop="visit">
          <el-input v-model="addFormdata.visit"></el-input>
        </el-form-item>
        <el-form-item label="体温" prop="temperature">
          <el-input type="number" v-model="addFormdata.temperature"></el-input>
        </el-form-item>
        <el-form-item label="咳嗽" prop="cough">
          <el-radio v-model="addFormdata.cough" label="0" border>无</el-radio>
          <el-radio v-model="addFormdata.cough" label="1" border>有</el-radio>
        </el-form-item>
        <el-form-item label="发烧" prop="fever">
          <el-radio v-model="addFormdata.fever" label="0" border>无</el-radio>
          <el-radio v-model="addFormdata.fever" label="1" border>有</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleAddForm = false">取 消</el-button>
        <el-button type="primary" @click="addCommit()">提 交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑" :visible.sync="visibleModifyForm">
      <el-form
              :model="editFormData"
              label-position="left"
              label-width="80px">
        <el-form-item label="学号" prop="userId">
          <el-input v-model="editFormData.userId"></el-input>
        </el-form-item>
        <el-form-item label="时间段" prop="type">
          <el-radio-group v-model="editFormData.type">
            <el-radio-button label="admin">辅导员</el-radio-button>
            <el-radio-button label="normal">学生</el-radio-button>
            <el-radio-button label="ban">封禁用户</el-radio-button>
            <el-radio-button label="other">其他用户</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="行程轨迹" prop="visit">
          <el-input v-model="editFormData.visit"></el-input>
        </el-form-item>
        <el-form-item label="体温" prop="temperature">
          <el-input type="number" v-model="editFormData.temperature"></el-input>
        </el-form-item>
        <el-form-item label="咳嗽" prop="cough">
          <el-radio v-model="editFormData.cough" label="0" border>无</el-radio>
          <el-radio v-model="editFormData.cough" label="1" border>有</el-radio>
        </el-form-item>
        <el-form-item label="发烧" prop="fever">
          <el-radio v-model="editFormData.fever" label="0" border>无</el-radio>
          <el-radio v-model="editFormData.fever" label="1" border>有</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleModifyForm = false">取 消</el-button>
        <el-button type="primary" @click="commit()">提 交</el-button>
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
  import {add, del, modify, get, search} from "@/api/health";

  export default {
    name: "HealthList",
    // components: { FilenameOption, AutoWidthOption, BookTypeOption },
    data() {
      return {
        role: this.$store.state.user.roles,
        studentData: [],
        editFormData: [],
        addFormdata: {
          userId: this.$store.state.user.id,
        },
        visibleAddForm: false,
        visibleModifyForm: false,
        keyword: {
          group: '',
          keyword: '',
          fever: '',
          temperature: '',
          cough: '',
          role: this.$store.state.user.roles,
          userId: this.$store.state.user.id,
          major: this.$store.state.user.major
        },
        page: 1,
        pageSize: 10,
        total: 0,
        value1: "", // 年级
        value2: "", // 班级
        type: [
          {
            value: "1",
            label: ""
          }
        ],
        visibleForm: false,
        editFormRules: {
          username: [{required: true, message: "请输入昵称", trigger: "blur"}],
          realname: [{required: true, message: "请输入姓名", trigger: "blur"}],
          telephone: [{required: true, message: "请输入联系电话", trigger: "blur"}],
          email: [{required: true, message: "请输入邮件", trigger: "blur"}],
          address: [{required: true, message: "请输入地址", trigger: "blur"}],
        }
      };
    },

    mounted() {
      this.allStudent();
    },

    methods: {
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['学号','时间' ,'时间段', '行程轨迹', '体温', '咳嗽','发烧']
          const filterVal = ['userId','createTime', 'type', 'visit', 'temperature', 'cough','fever']
          const list = this.studentData
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename,
            autoWidth: this.autoWidth,
            bookType: this.bookType
          })
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'fever'|| j === 'cough') {
            return this.formatH1(v[j])
          } else {
            return v[j]
          }
        }))
      }
      ,
      formatH1(data){
        if (data == '0') {
          return '无'
        }else{
          return '有'
        }
      }
      ,
      statusFormatter(data) {
        if (data.status == '0') {
          return '待审批'
        }
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
              this.$message({message: "添加成功", type: "success"});
              this.allStudent()
            }
          })
          .catch(error => {
            this.$message.error("添加失败");
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

      /***
       * 编辑提交
       */
      commit() {
        this.modifyStudent(this.editFormData)
      },

      inputListener() {
        this.allStudent()
      },

      /**
       * 查询所有
       */
      allStudent() {
        get(this.page,this.pageSize,this.role,
          this.keyword.userId, this.keyword.major).then(res => {
          let ret = res.data
          console.log(ret)
          this.studentData = ret.records
          this.total = ret.total
        })
          .catch(error => {
            this.$message.error("查询列表失败")
          });
      },

      /**
       * 关键字查询
       */
      searchStudent() {
        search(this.keyword)
          .then(res => {
            let ret = res.data
            this.studentData = ret.records
            this.total = ret.total
            this.$message({message: "查询成功", type: "success"})
          })
          .catch(error => {
            this.$message.error("查询失败")
          });
      },

      resetById(index, row) {
        this.resetPassword(row.id);
      },

      resetPassword(id) {
        modify({"id": id, "password": "123456"})
          .then(res => {
            this.$message({message: "重置密码成功", type: "success"});
          })
          .catch(error => {
            this.$message.error("重置密码失败");
          });
      },

      deleteById(index, row) {
        this.deleteRequestById(row.id)
      },

      deleteRequestById(id) {
        del(id).then(res => {
          this.$message({message: "删除成功", type: "success"})
          this.allStudent()
        }).catch(error => {
          this.$message.error("删除失败")
        });
      },

      /*审核状态*/
      statusById(index, row, status) {
        this.statusRequestById(row.id, status)
      },

      statusRequestById(id, status) {
        modify({"id": id, "status": status}).then(res => {
          this.$message({message: "处理成功", type: "success"})
          this.allStudent()
        }).catch(error => {
          this.$message.error("处理失败")
        });
      },

      /**
       * 编辑用户
       */
      showEditForm(index, row) {
        this.editFormData = row
        this.visibleModifyForm = true
      },

      /**
       * 更新用户
       */
      modifyStudent(modifyData) {
        modify(modifyData)
          .then(res => {
            this.$message({message: "更新成功", type: "success"})
            this.allStudent()
            this.visibleForm = false
          })
          .catch(error => {
            this.$message.error("更新失败")
          });
      },

      handleSizeChange() {
      },

      handleCurrentChange(v) {
        this.page = v
        this.allStudent()
      },
      showAddForm() {
        this.visibleAddForm = true;
      },
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

  .addbtn {
    margin-left: 25px;
  }

  .header-search {
    margin-left: 5px;
  }
</style>
