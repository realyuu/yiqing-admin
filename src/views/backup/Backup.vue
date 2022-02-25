<template>
    <div class="">
        <div class="menu">
            <el-input>
                <el-button type="primary" @click="backupData" class="addbtn">备份数据</el-button><br>
                <el-button type="primary" @click="rollbackData" class="addbtn">恢复数据</el-button>
                <el-select v-model="name" filterable placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-input>
        </div>
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
    import { backup, rollback, backupList} from "@/api/backup";

    export default {
        name: "",
        data() {
            return {
                msgOne: "",
                msgTwo: "",
                page: 1,
                pageSize: 10,
                total: 0,
                value1: "", // 年级
                value2: "", // 班级
                groups: [],
                visibleForm: false,
                options: [],
                value: "",
                name: "",
            };
        },
        components: {},
        created() {},
        mounted() {
            this.getList();
        },
        methods: {
            backupData() {
                backup()
                    .then((res) => {
                        if (res.code == 0) {
                            this.$message({ title: "成功", message: "备份成功", type: "success" });
                            this.getList();
                        }
                    })
                    .catch(() => {
                        this.$message.error("添加失败");
                    });
            },
            rollbackData(name) {
                this.name = name;
                rollback(name)
                    .then(() => {
                        this.$message({ title: "成功", message: "恢复成功", type: "success" });
                        this.getList();
                    })
                    .catch(() => {
                        this.$message.error("恢复失败");
                    });
            },
            getList() {
                backupList()
                    .then((res) => {
                        res.data.records.forEach((item) => {
                            this.options.push(item);
                        });
                    })
                    .catch(() => {
                        this.$message.error("获取备份数据列表失败");
                    });
            },
        },
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
