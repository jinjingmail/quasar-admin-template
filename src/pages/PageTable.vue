<template>
  <div>
    <co-dialog
      ref="printDialog"
      title="打印"
      icon="print"
      >
      <q-card-section>
        <div class="text-h6">打印的标题</div>
        <div class="text-body2">这里是要打印的内容</div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn dense label="关闭" flat v-close-popup />
        <q-btn dense label="打印" color="primary" @click="$q.notify({type:'info', message:'打印'})"/>
      </q-card-actions>
    </co-dialog>

    <co-dialog
      ref="formDialog2"
      title="表单演示2"
      no-backdrop-dismiss
      card-style="width:900px; max-width:95vw;"
    >
      <co-form ref="dialogForm"
        class="q-px-lg q-my-none row q-col-gutter-x-xl q-col-gutter-y-md">

          <co-input class="col-12 col-sm-6" label-slot label="输入框第一个" v-model="dialogForm.calcium" >
            <template v-slot:label>
              <span style="color: var(--q-color-primary)">输入框第一个</span>
            </template>
          </co-input>
          <co-input class="col-12 col-sm-6" label="输入框第二个" v-model="dialogForm.calcium" :rules="[val => !!val || 'Field is required']"/>
          <co-select
            class="col-12 col-sm-6"
            label-slot
            label="选择框第一个"
            use-input
            hide-selected
            fill-input
            v-model="selectModel"
            no-filter
            :options="mapOptions"
            option-value="id"
            option-label="desc"
            option-disable="inactive"
            clearable
            emit-value
            map-options
          >
            <template v-slot:label>
              <span style="color: var(--q-color-primary)">输入框第一个</span>
            </template>
          </co-select>
          <co-select
            class="col-12 col-sm-6"
            label="选择框第二个"
            v-model="selectModel"
            no-filter
            :options="mapOptions"
            option-value="id"
            option-label="desc"
            option-disable="inactive"
            emit-value
            map-options
          />
          <co-select
            class="col-12 col-sm-6"
            label="选择框第三个"
            label-slot
            v-model="selectModel"
            no-filter
            use-input
            hide-selected
            fill-input
            :options="mapOptions"
            option-value="id"
            option-label="desc"
            option-disable="inactive"
            use-chips
            clearable
            emit-value
            map-options
          >
            <template v-slot:label>
              <span style="color: var(--q-color-primary)">Slot 标签</span>
            </template>
          </co-select>
          <co-select
            class="col-12 col-sm-6"
            label="选择框第四个"
            v-model="selectModel"
            no-filter
            :options="mapOptions"
            option-value="id"
            option-label="desc"
            option-disable="inactive"
            use-chips
            clearable
            emit-value
            map-options
          />
      </co-form>
      <q-card-actions class="q-pa-md">
        <q-space />
        <co-btn label="取消" flat v-close-popup />
        <co-btn label="保存"  type="submit" color="primary" @click="$refs.dialogForm.submit()"/>
      </q-card-actions>
    </co-dialog>

    <co-dialog
      ref="formDialog"
      title="表单演示"
      no-backdrop-dismiss
      card-style="width:1200px; max-width:95vw;"
    >
      <div class="q-ma-md ">
        <div class="row q-gutter-sm">
          <co-checkbox v-model="labelTop" label="label-top" />
          <co-input v-model.lazy="labelStyle" placeholder="form-label-style" style="width:255px"/>
          <co-field borderless>
            <template v-slot:control>试试输入 display:none</template>
          </co-field>
        </div>
        <div class="q-gutter-sm">
          <co-radio v-model="labelAlign" val="auto" label="auto" />
          <co-radio v-model="labelAlign" val="left" label="left" />
          <co-radio v-model="labelAlign" val="center" label="center" />
          <co-radio v-model="labelAlign" val="right" label="right" />
        </div>
        <div class="q-gutter-sm">
          <co-radio v-model="labelWidth" val="fit-content" label="fit-content" />
          <co-radio v-model="labelWidth" val="xsmall" label="xsmall" />
          <co-radio v-model="labelWidth" val="small" label="small" />
          <co-radio v-model="labelWidth" val="medium" label="medium" />
          <co-radio v-model="labelWidth" val="large" label="large" />
          <co-radio v-model="labelWidth" val="xlarge" label="xlarge" />
          <co-radio v-model="labelWidth" val="xxlarge" label="xxlarge" />
        </div>
      </div>
      <q-separator />
      <co-form ref="dialogForm"
        @submit="onDialogFormSubmit"
        :label-top="labelTop"
        :label-align="labelAlign"
        :label-width="labelWidth"
        :form-label-style="labelStyle"
        class="q-px-lg q-my-none row q-col-gutter-x-xl q-col-gutter-y-md">
          <co-input dense class="col-12 col-sm-6" form-label="ID" v-model="dialogForm.id" disable
            >
          </co-input>
          <co-input dense class="col-12 col-sm-6" form-label="名称很长怎么办名称很长怎么办名称很长怎么办"
            placeholder="form-label名称很长"
            v-model="dialogForm.name" clearable :disable="dialogFormReadonly"
            standout
            @blur="$q.notify({message:'名称 blur notify'})"
            :rules="[val => !!val || 'Field is required']" />
          <co-input class="col-12 col-sm-6" dense form-label="calories" label="标签" v-model="dialogForm.calories" :disable="dialogFormReadonly" ref="form_calories">
            <template v-slot:append>
              <q-icon v-if="!dialogForm.calories" name="search" />
              <q-icon v-else name="clear" class="cursor-pointer" @click="dialogForm.calories = ''" />
            </template>
            <template v-slot:prepend>
              <q-icon name="add" />
            </template>
            <template v-slot:before>
              <q-icon name="expand_less" />
            </template>
            <template v-slot:after>
              <q-icon name="expand_more" />
            </template>
          </co-input>
          <co-input dense class="col-12 col-sm-6" form-label="fat" v-model="dialogForm.fat" :disable="dialogFormReadonly" :rules="[
              val => !!val || '不能空',
              val => val.length === 11 || '请输入11个字符'
              ]"
              >
          </co-input>
          <co-input class="col-12 col-sm-6" form-label="protein" form-label-style="color:green" v-model="dialogForm.protein" :outlined="false"  :disable="dialogFormReadonly"></co-input>
          <co-input class="col-12 col-sm-6" form-label="sodium" form-label-style="background-color:grey" v-model="dialogForm.sodium" filled :disable="dialogFormReadonly"></co-input>
          <co-input class="col-12 col-sm-6" dense outlined form-label="calcium1" label="calcium" v-model="dialogForm.calcium" :disable="dialogFormReadonly" :rules="[val => !!val || 'Field is required']"/>
          <co-input class="col-12 col-sm-6" dense form-label="calcium2" label="calcium" label-slot v-model="dialogForm.calcium" :disable="dialogFormReadonly" standout>
            <template v-slot:label>
              <span style="color: green">Label Slot 标签</span>
            </template>
          </co-input>
          <co-select
            class="col-12 col-sm-6"
            dense
            form-label="protein1"
            placeholder="选择"
            outlined
            use-input
            hide-selected
            fill-input
            :disable="dialogFormReadonly"
            v-model="selectModel"
            no-filter
            :options="mapOptions"
            option-value="id"
            option-label="desc"
            option-disable="inactive"
            clearable
            emit-value
            map-options
          />
          <co-select
            class="col-12 col-sm-6"
            dense
            form-label="protein2"
            filled
            :disable="dialogFormReadonly"
            v-model="selectModel"
            no-filter
            :options="mapOptions"
            option-value="id"
            option-label="desc"
            option-disable="inactive"
            clearable
            emit-value
            map-options
          />
          <co-select
            class="col-12 col-sm-6"
            dense
            form-label="protein3"
            label-slot
            label="选择"
            outlined
            :disable="dialogFormReadonly"
            v-model="selectModel"
            no-filter
            use-input
            hide-selected
            fill-input
            :options="mapOptions"
            option-value="id"
            option-label="desc"
            option-disable="inactive"
            clearable
            emit-value
            map-options
          >
            <template v-slot:label>
              <span style="color: var(--q-color-primary)">Label Slot 标签</span>
            </template>
          </co-select>
          <co-select
            class="col-12 col-sm-6"
            dense
            form-label="protein4"
            label="选择"
            filled
            :disable="dialogFormReadonly"
            v-model="selectModel"
            no-filter
            :options="mapOptions"
            option-value="id"
            option-label="desc"
            option-disable="inactive"
            clearable
            emit-value
            map-options
          />
          <co-select
            v-model="selectModel"
            form-label="big select1"
            :dense="false"
            class="col-12 col-sm-6"
            :disable="dialogFormReadonly"
            clearable
            outlined
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            label="大选择框"
            :options="listOptions"
            :rules="[val => !!val || 'Field is required']"
          >
            <template v-slot:append>
              <q-icon name="add"/>
            </template>
          </co-select>
          <co-select
            v-model="selectModel"
            form-label="big select2"
            class="col-12 col-sm-6"
            :disable="dialogFormReadonly"
            :dense="false"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            placeholder="大选择框"
            :options="listOptions"
            :rules="[val => !!val || 'Field is required']"
          >
            <template v-slot:append>
              <q-icon name="add"/>
            </template>
          </co-select>
          <co-select
            v-model="selectModel"
            form-label="big select3"
            class="col-12 col-sm-6"
            :disable="dialogFormReadonly"
            :dense="false"
            clearable
            outlined
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            placeholder="大选择框"
            :options="listOptions"
            :rules="[val => !!val || 'Field is required']"
          >
          </co-select>
          <co-select
            v-model="selectModel"
            form-label="big select4"
            class="col-12 col-sm-6"
            :disable="dialogFormReadonly"
            :dense="false"
            clearable
            input-debounce="0"
            label="大选择框"
            label-slot
            :options="listOptions"
            :rules="[val => !!val || 'Field is required']"
          >
            <template v-slot:label>
              Label Slot 标签
            </template>
            <template v-slot:append>
              <q-icon name="add"/>
            </template>
          </co-select>

          <co-input class="col-12 col-sm-6" form-label="big input" v-model="dialogForm.iron"
            outlined
            :dense="false"
            label="大输入框"
            clearable :disable="dialogFormReadonly">
          </co-input>

          <co-input class="col-12 col-sm-6" form-label="big input2" v-model="dialogForm.iron"
            placeholder="大输入框"
            :dense="false"
            clearable :disable="dialogFormReadonly">
          </co-input>

          <co-field
            class="col-12 col-sm-6"
            dense
            form-label="options"
            :disable="dialogFormReadonly"
          >
            <template v-slot:control>
              <div class="q-gutter-sm">
                <co-radio dense name="shape" v-model="selectModel" val="facebook" label="Facebook" />
                <co-radio dense name="shape" v-model="selectModel" val="腾讯" label="腾讯控股" />
              </div>
            </template>
          </co-field>
          <co-field class="col-12 col-sm-6" form-label="options Group" borderless :value="selectModel">
            <template v-slot:control>
              <co-option-group
                v-model="selectModel"
                :inline="true"
                :disable="dialogFormReadonly"
                :options="mapOptions"
                option-value="id"
                option-label="desc"
                :rules="[val => !!val || 'Field is required']"
              />
            </template>
          </co-field>
          <co-select
            v-model="selectModels"
            form-label="multiselect1"
            class="col-12 col-sm-6"
            :disable="dialogFormReadonly"
            dense
            option-value="id"
            option-label="desc"
            option-disable="inactive"
            clearable
            use-chips
            placeholder="选择巨头"
            :options="mapOptions"
            map-options
            emit-value
            multiple
            />
          <co-select
            v-model="selectModels"
            form-label="multiselect2"
            class="col-12 col-sm-6"
            :disable="dialogFormReadonly"
            dense
            option-value="id"
            option-label="desc"
            option-disable="inactive"
            use-input
            fill-input
            use-chips
            input-debounce="0"
            :options="mapOptions"
            map-options
            emit-value
            multiple
            />
          <co-select
            v-model="selectModels"
            form-label="big multiselect3"
            class="col-12 col-sm-6"
            :disable="dialogFormReadonly"
            option-value="id"
            option-label="desc"
            option-disable="inactive"
            :dense="false"
            clearable
            use-input
            fill-input
            use-chips
            :options="mapOptions"
            map-options
            emit-value
            multiple
            />
          <co-select
            v-model="selectModels"
            form-label="big multiselect4"
            class="col-12 col-sm-6"
            :disable="dialogFormReadonly"
            option-value="id"
            option-label="desc"
            option-disable="inactive"
            :dense="false"
            use-chips
            placeholder="选择巨头"
            :options="mapOptions"
            map-options
            emit-value
            multiple
            />

          <co-select
            v-model="selectModels"
            form-label="multiselect11"
            class="col-12 col-sm-6"
            :disable="dialogFormReadonly"
            dense
            option-value="id"
            option-label="desc"
            option-disable="inactive"
            clearable
            placeholder="选择巨头"
            :options="mapOptions"
            map-options
            emit-value
            multiple
            />
          <co-select
            v-model="selectModels"
            form-label="multiselect22"
            class="col-12 col-sm-6"
            :disable="dialogFormReadonly"
            dense
            option-value="id"
            option-label="desc"
            option-disable="inactive"
            use-input
            fill-input
            :options="mapOptions"
            map-options
            emit-value
            multiple
            />
          <co-select
            v-model="selectModels"
            form-label="big multiselect33"
            class="col-12 col-sm-6"
            :disable="dialogFormReadonly"
            option-value="id"
            option-label="desc"
            option-disable="inactive"
            :dense="false"
            clearable
            use-input
            fill-input
            :options="mapOptions"
            map-options
            emit-value
            multiple
            />
          <co-select
            v-model="selectModels"
            form-label="big multiselect44"
            class="col-12 col-sm-6"
            :disable="dialogFormReadonly"
            option-value="id"
            option-label="desc"
            option-disable="inactive"
            :dense="false"
            placeholder="选择巨头"
            :options="mapOptions"
            map-options
            emit-value
            multiple
            />

          <co-field class="col-12 col-sm-6" form-label="optionsGroup1" borderless :value="selectModels">
            <template v-slot:control>
              <co-option-group
                v-model="selectModels"
                :inline="true"
                :disable="dialogFormReadonly"
                :options="mapOptions"
                option-value="id"
                option-label="desc"
                type="checkbox"
                :rules="[val => !!val || 'Field is required']"
              />
            </template>
          </co-field>
          <co-field class="col-12 col-sm-6" form-label="optionsGroup2" borderless :value="selectModels">
            <template v-slot:control>
              <co-option-group
                v-model="selectModels"
                :inline="true"
                :disable="dialogFormReadonly"
                :options="mapOptions"
                option-value="id"
                option-label="desc"
                type="toggle"
                :rules="[val => !!val || 'Field is required']"
              />
            </template>
          </co-field>
          <co-date-select
            v-model="selectDate"
            form-label="selectDate1 LEFT"
            :dense="false"
            clearable
            class="col-12 col-sm-6" label-align="left" label-width="large" no-ellipsis mask="####-##-##" placeholder="####-##-##" :disable="dialogFormReadonly"
          />
          <co-date-select
            v-model="selectDate"
            form-label="selectDate2"
            hide-dropdown-icon
            :dense="false"
            clearable
            class="col-12 col-sm-6" no-ellipsis mask="####-##-##" placeholder="####-##-##" :disable="dialogFormReadonly"
          />

          <co-date-select
            v-model="selectDate3"
            form-label="selectDate3"
            hide-dropdown-icon
            :default-time="['00:00:00']"
            :dense="false"
            clearable
            class="col-12 col-sm-6" no-ellipsis placeholder="####-##-##" :disable="dialogFormReadonly"
          />

          <co-date-select
            v-model="selectDate3"
            form-label="selectDate4"
            hide-dropdown-icon
            edit-time
            with-seconds
            :default-time="['00:00:00']"
            :dense="false"
            clearable
            class="col-12 col-sm-6" no-ellipsis placeholder="####-##-##" :disable="dialogFormReadonly"
          />

          <co-field class="col-12 col-sm-6" form-label="文本1" borderless>
            <template v-slot:control>
              语句用于基于不同条件执行不同动作
            </template>
          </co-field>

          <co-field class="col-12 col-sm-6" form-label="文本2" >
            <template v-slot:control>
              作语句用于基于不同条件执行不同动作语句用于基于不同条件执行不同动作语句用于基于不同条件执行不同动作
            </template>
          </co-field>

          <co-field class="col-12 col-sm-6" form-label="text field1" readonly>
            <template v-slot:control>readonly语句用于基于不同条件执行不同动作</template>
          </co-field>
          <co-field class="col-12 col-sm-6" form-label="text field2" disable>
            <template v-slot:control>disable语句用于基于不同条件执行不同动作</template>
          </co-field>

          <co-field dense borderless class="col-12 col-sm-6" form-label="RIGHT" label-align="right" disable>
            <template v-slot:control>
              <co-radio dense v-model="shape" class="col-6 col-md-4" val="line" label="Line" />
              <co-radio dense v-model="shape" class="col-6 col-md-4" val="rectangle" label="Rectangle" />
              <co-radio dense v-model="shape" class="col-6 col-md-4" val="ellipse" label="Ellipse" />
            </template>
          </co-field>

          <co-date-select
            class="col-12 col-sm-6"
            form-label="no-ellipsis no-ellipsis no-ellipsis no-ellipsis"
            no-ellipsis
            v-model="dialogForm.date3"
            clearable
            :disable="dialogFormReadonly"
            :rules="[val => !!val || 'Field is required']"
          >
            <template v-slot:append>
              <q-icon name="event" />
            </template>
          </co-date-select>

          <co-date-select
            class="col-12 col-sm-6"
            form-label="DateRange1"
            dense
            v-model="dialogForm.date2"
            form-label-style="color:grey"
            clearable
            range
            :disable="dialogFormReadonly"
            :rules="[val => !!val || 'Field is required']"
          >
          </co-date-select>
          <co-date-select
            class="col-12 col-sm-6"
            form-label="DateRange2"
            dense
            v-model="dialogForm.date2"
            range
            :disable="dialogFormReadonly"
            :rules="[val => !!val || 'Field is required']"
          >
          </co-date-select>

          <co-date-select
            class="col-12 col-sm-6"
            form-label="DateRange3"
            :default-time="['00:00:00', '23:59:59']"
            v-model="dialogForm.date4"
            range
            :disable="dialogFormReadonly"
            :rules="[val => !!val || 'Field is required']"
            clearable
          >
          </co-date-select>
          <co-date-select
            class="col-12 col-sm-6"
            form-label="DateRange4"
            :default-time="['00:00:00', '23:59:59']"
            edit-time
            with-seconds
            v-model="dialogForm.date4"
            range
            :disable="dialogFormReadonly"
            :rules="[val => !!val || 'Field is required']"
          >
          </co-date-select>

          <co-tree-select
            class="col-12 col-sm-6"
            form-label="TreeTicked1"
            dense
            :nodes="treeDatas()"
            node-key="id"
            label-key="name"
            :ticked.sync="dialogForm.ticked"
            tick-strategy="leaf-all-only-parent"
            filter-key-like="nameLetter"
            filter-key-equal="id"
            tree-style="min-width:300px; max-height:70vh;"
            tree-class="q-pa-sm"
            :disable="dialogFormReadonly"
            clearable
            :rules="[val => !!val || 'Field is required']"
          />
          <co-tree-select
            class="col-12 col-sm-6"
            form-label="TreeTicked2"
            dense
            :nodes="treeDatas()"
            node-key="id"
            label-key="name"
            :ticked.sync="dialogForm.ticked"
            tick-strategy="leaf-all-only-parent"
            filter-key-like="nameLetter"
            filter-key-equal="id"
            :disable="dialogFormReadonly"
            :rules="[val => !!val || 'Field is required']"
          />
          <co-input
            form-label="autogrow1"
            class="col-12 col-sm-6"
            dense
            v-model="text"
            placeholder="自动扩张尺寸"
            autogrow
            :rules="[val => !!val || 'Field is required']"
          />
          <co-input
            form-label="autogrow2"
            label="文本域"
            class="col-12 col-sm-6"
            dense
            v-model="text"
            autogrow
          />
          <co-input
            form-label="textarea1"
            class="col-12 col-sm-6"
            dense
            v-model="text"
            type="textarea"
            rows="2"
            :rules="[val => !!val || 'Field is required']"
          />
          <co-input
            form-label="textarea2"
            label="文本域"
            class="col-12 col-sm-6"
            dense
            v-model="text"
            type="textarea"
            rows="2"
          />

          <co-input
            form-label="autogrow big1"
            class="col-12 col-sm-6"
            :dense="false"
            v-model="text"
            autogrow
          />
          <co-input
            form-label="autogrow big2"
            label="文本域"
            class="col-12 col-sm-6"
            :dense="false"
            v-model="text"
            autogrow
            :rules="[val => !!val || 'Field is required']"
          />
          <co-input
            form-label="textarea big1"
            class="col-12 col-sm-6"
            :dense="false"
            v-model="text"
            type="textarea"
            rows="2"
          />
          <co-input
            form-label="textarea big2"
            label="文本域"
            label-slot
            class="col-12 col-sm-6"
            :dense="false"
            v-model="text"
            type="textarea"
            rows="2"
            :rules="[val => !!val || 'Field is required']"
          >
            <template v-slot:label>
              Label Slot 标签
            </template>
          </co-input>
      </co-form>
      <q-card-actions class="q-pa-md">
        <co-btn label="打印" color="primary" @click="$refs.printDialog.show()"/>
        <q-space />
        <co-btn label="取消" flat v-close-popup />
        <co-btn label="保存"  type="submit" color="primary" v-if="!dialogFormReadonly" @click="$refs.dialogForm.submit()"/>
      </q-card-actions>
    </co-dialog>

    <co-table
      row-key="id"
      dense
      stickyHeader
      :data="data"
      :columns="columns"
      :visible-columns="visibleColumns"
      selection="multiple"
      :selected.sync="selected"
      :fullscreen.sync="tableFullscreen"
      :loading="loading"
    >
      <template v-slot:top="props">
        <div class='row q-col-gutter-x-md q-col-gutter-y-xs full-width'>
          <div class='col-auto q-pl-none q-gutter-sm no-wrap'>
            <co-btn color="primary" icon="add" @click="rowAddClick"/>
            <co-btn color="primary" icon="edit" @click="rowEditClick_selected" :disable="selected.length!==1"/>
            <co-btn color="primary" icon="delete" @click="rowDelClick_selected" :disable="selected.length===0"/>
            <co-btn-dropdown auto-close icon="more_vert" color="primary" class="btn-dropdown-hide-droparrow">
              <div class="row no-wrap q-pa-sm">
                <div class="column">
                  <co-btn label="对话框样式1" @click="$refs.formDialog.show()"></co-btn>
                  <co-btn label="对话框样式2" @click="$refs.formDialog2.show()"></co-btn>
                </div>
              </div>
            </co-btn-dropdown>
          </div>

          <q-space />

          <co-input v-model="textSearch" class="col-6 col-sm-4 col-md-3 col-lg-2" placeholder="姓名"/>
          <co-input v-model="textSearch" class="col-6 col-sm-4 col-md-3 col-lg-2" placeholder="姓名"/>
          <template v-if="searchToggle" >
            <co-input v-model="textSearch" class="col-6 col-sm-4 col-md-3 col-lg-2" placeholder="姓名"/>
            <co-input v-model="textSearch" class="col-6 col-sm-4 col-md-3 col-lg-2" placeholder="姓名"/>
            <co-input v-model="textSearch" class="col-6 col-sm-4 col-md-3 col-lg-2" placeholder="姓名"/>
          </template>

          <q-space/>

          <co-btn-group flat rounded class="col-auto">
            <co-btn color="grey-3" text-color="dark" icon="search"/>
            <co-btn color="grey-3" text-color="dark" :icon="searchToggle?'zoom_out':'zoom_in'" @click="searchToggle = !searchToggle"/>
            <co-btn-dropdown auto-close color="grey-3" text-color="dark" class="btn-dropdown-hide-droparrow" icon="apps">
              <div class="row no-wrap q-pa-sm">
                <div class="column">
                  <co-btn flat label="清空搜索" icon="replay"/>
                  <co-btn flat label="全屏" :icon="props.inFullscreen?'fullscreen_exit':'fullscreen'" @click.native="toggleTableFullscreen(props)"/>
                  <q-separator/>
                  <co-toggle v-model="visibleColumns" v-for="item in columns" :key="item.name" :val="item.name" :label="item.label" />
                </div>
              </div>
            </co-btn-dropdown>
          </co-btn-group>

        </div>
      </template>

      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <div>
            <q-badge color="purple" :label="props.value" />
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn-dropdown label="" dense flat>
            <q-list>
              <q-item clickable v-close-popup dense @click="rowViewClick(props.row)">
                <q-item-section>
                  <q-item-label>查看</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup dense @click="rowEditClick(props.row)">
                <q-item-section>
                  <q-item-label>修改</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup dense @click="rowDelClick(props.row)">
                <q-item-section>
                  <q-item-label>删除</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator />

              <q-item clickable v-close-popup dense @click="rowLooooooongButtonClick()">
                <q-item-section>
                  <q-item-label>一个长长的按钮</q-item-label>
                </q-item-section>
              </q-item>

            </q-list>
          </q-btn-dropdown>
        </q-td>
      </template>

      <template v-slot:pagination>
        <q-pagination
          v-model="currentPage"
          :max="500"
          :direction-links="true"
          :boundary-links="false"
          input
          input-class="text-orange-10"
        />
        <q-select
          dense options-dense borderless
          flat
          v-model="numberPerPage"
          :options="numberPerPageOptions"
          emit-value
          map-options
        />
      </template>

    </co-table>
  </div>
</template>

<script>
import depts from '@/data/depts.js'
import { data, columns, visibleColumns } from '../data/test.js'

const dialogFormDefault = { id: null, name: null, calories: null, fat: null, protein: null, sodium: null, calcium: null, iron: null }

export default {
  name: 'PageTable',
  data () {
    return {
      labelTop: false,
      labelAlign: 'right',
      labelWidth: 'medium',
      labelStyle: '',
      text: '',
      textSearch: '',
      shape: '',
      selectModel: undefined,
      selectModels: [],
      selectDate: '',
      selectDate3: '',
      listOptions: ['facebook', 'twitter', 'google', '阿里巴巴', '腾讯'],
      mapOptions: [
        {
          id: 'google',
          desc: 'Google'
        },
        {
          id: 'facebook',
          desc: 'Facebook'
        },
        {
          id: 'twitter',
          desc: 'Twitter'
        },
        {
          id: 'apple',
          desc: '苹果'
        },
        {
          id: '阿里巴巴',
          desc: '阿里巴巴集团'
        },
        {
          id: 'oracle',
          desc: 'Oracle',
          inactive: true
        },
        {
          id: '腾讯',
          desc: '腾讯控股'
        }
      ],
      currentPage: 0,
      numberPerPage: 10,
      numberPerPageOptions: [{ label: '10/页', value: 10 }, { label: '20/页', value: 20 }, { label: '30/页', value: 30 }, { label: '40/页', value: 40 }, { label: '50/页', value: 50 }, { label: '100/页', value: 100 }],
      searchToggle: false,
      loading: false,
      dialogForm: {},
      dialogFormReadonly: true,
      fabPos: [48, 68],
      draggingFab: false,
      selected: [],
      tableFullscreen: null,
      visibleColumns,
      columns: columns,
      data: data
    }
  },
  watch: {
    '$q.screen.gt.xs' (val) {
      console.log('$q.screen.gt.xs=' + val)
    }
  },
  created () {
    console.log('pageTable created')
  },
  mounted () {
    console.log('pageTable mounted')
  },
  activated () {
    console.log('pageTable activated')
  },
  deactivated () {
    console.log('pageTable deactivated')
  },
  destroyed () {
    console.log('pageTable destroyed')
  },
  methods: {
    treeDatas () {
      return depts.content
    },
    onDialogFormSubmit () {
      console.log('this.dialogForm:', this.dialogForm)
      if (this.dialogFormReadonly) {
        return
      }
      this.$refs.dialogForm.validate().then(success => {
        if (success) {
          // yay, models are correct
          this.$q.notify({
            type: 'positive',
            message: `提交ID:${this.dialogForm.id}`
          })
        } else {
          // oh no, user has filled in
          // at least one invalid value
          this.$q.notify({
            type: 'negative',
            message: '提交失败'
          })
        }
      })
    },
    rowViewClick (row) {
      this.dialogForm = { ...row }
      this.dialogFormReadonly = true
      this.$refs.formDialog.show()
    },
    rowAddClick () {
      this.dialogForm = { ...dialogFormDefault }
      this.dialogFormReadonly = false
      this.$refs.formDialog.show()
    },
    rowEditClick (row) {
      this.dialogForm = { ...row }
      this.dialogFormReadonly = false
      this.$refs.formDialog.show()
    },
    rowEditClick_selected () {
      var row = this.selected[0]
      this.rowEditClick(row)
    },
    rowDelClick (row) {
      this.$q.notify({
        type: 'warning',
        message: `删除ID:${row.id}`
      })
    },
    rowDelClick_selected () {
      var count = 0
      if (this.selected) {
        count = this.selected.length
      }
      this.$q.notify({
        type: 'negative',
        message: `删除${count}条`
      })
    },
    rowLooooooongButtonClick () {
      this.$q.notify({
        type: 'positive',
        message: 'rowLooooooongButtonClick'
      })
    },
    moveFab (ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true

      this.fabPos = [
        this.fabPos[0] - ev.delta.x,
        this.fabPos[1] - ev.delta.y
      ]
    },
    toggleTableFullscreen (props) {
      props.toggleFullscreen()
      this.$nextTick(() => {
        console.log('tableFullscreen=', this.tableFullscreen)
      })
    }
  }
}
</script>
