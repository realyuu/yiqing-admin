<template>
  <div>
    <el-table :data="list" @row-click="openDetails" style="width: 100%;padding-top: 15px;">
      <el-table-column label="通知标题" min-width="200">
        <template slot-scope="scope">
          {{ scope.row.title  }}
        </template>
      </el-table-column>
      <el-table-column label="时间" width="195" align="center">
        <template slot-scope="scope">
          {{ scope.row.createTime  }}
        </template>
      </el-table-column>
      <!--    <el-table-column label="状态" width="100" align="center">-->
      <!--      <template slot-scope="{row}">-->
      <!--        <el-tag :type="row.status | statusFilter">-->
      <!--          {{ row.status }}-->
      <!--        </el-tag>-->
      <!--      </template>-->
      <!--    </el-table-column>-->
    </el-table>

    <el-dialog title="消息" :visible.sync="modalVisible">
      <p><span>标题：{{modalData.title}}</span></p>
      <p> <span>内容：{{modalData.content}}</span></p>
      <p><span>作者：{{modalData.author}}</span></p>
      <p><span>时间：{{modalData.createTime}}</span></p>
      <span slot="footer" class="dialog-footer">
<!--    <el-button @click="modalVisible = false">取 消</el-button>-->
      <el-button type="primary" @click="modalVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { get } from '@/api/notice'
const { parseTime } = require('@/utils')

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        error: 'danger',
        running: 'warning',
      }
      return statusMap[status]
    },
    timestampFilter(str) {
      return parseTime(str);
     }
  },
  data() {
    return {
      list: null,
      modalData:{},   //模态对话框的数据
      modalVisible: false,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      get(1).then(response => {
        console.log(response)
        this.list = response.data.records.slice(0, 5)
      })
    },
    openDetails(row){
      this.modalData = row
      this.modalVisible = true
    }
  }
}
</script>
