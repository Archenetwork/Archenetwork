<template>
  <!-- userInfo -->
  <div class="info" v-if="userInfo">
    <div class="avatar">
      <div class="a-page-title-small">
        <div class="a-page-title-small-name">Avatar</div>
      </div>
      <div class="imgUpload">
        <img :src="userInfo.avatar"  alt="">
        <input class="upload-input" type="file" ref="inputRef" name="file" @change="handleChange">
        <button-common class="chooseFile" @click.prevent="changeAvatar" loadingText="uploading" :loading="uploadLoading" :disabled="uploadLoading" simple>Choose file</button-common>
      </div>
    </div>
    <div class="username">
      <div class="a-page-title-small">
        <div class="a-page-title-small-name">Username</div>
        <div class="a-page-title-small-right">
          <div class="id">ID:{{userInfo.archeId}}</div>
        </div>
      </div>
      <a-input big :placeholder="'Enter your username'" :failed="usernameFailed" :maxlength="30" v-model="userInfo.username"></a-input>
    </div>
    <div class="email">
      <div class="a-page-title-small">
        <div class="a-page-title-small-name">E-mail <span>(Optional)</span></div>
      </div>
      <a-input big :placeholder="'Enter your E-mail address'" :failed="emailFailed" failedtext="Email format error" :maxlength="50" v-model="userInfo.email"></a-input>
    </div>
    <div class="bio">
      <div class="a-page-title-small">
        <div class="a-page-title-small-name">Bio <span>(Optional)</span></div>
      </div>
      <a-textarea :placeholder="'Enter your bio'" v-model="userInfo.bio"></a-textarea>
    </div>
    <div class="btnGroup">
      <button-common class="update" @click.prevent="submit" :loading="updateLoading" :disabled="updateLoading" full>Update profile</button-common>
      <div class="signOut" @click="handleLogout">Sign out</div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { uploadImage } from 'api/http/common'
import { updateUser, getUser } from 'api/http/user'
import { ElMessage } from 'element-plus'
import useCommonStore from '@/store/common'
import { getImageType } from 'utils/file'
import { validateEmail } from 'utils/validate'
import buttonCommon from 'components/tmp/common.vue'
import AInput from 'components/form/AInput.vue'
import ATextarea from 'components/form/ATextarea.vue'
import config from '@/config'
import { useRoute } from 'vue-router'

const commonStore = useCommonStore()
const route = useRoute()

const userInfo = ref(null)
watch(() => commonStore.userInfo, (newValue) => {
  userInfo.value = commonStore.userInfo
}, { immediate: true })

const inputRef = ref(null)
const uploadLoading = ref(false)
// avatar
const changeAvatar = () => {
  if (!uploadLoading.value) {
    inputRef.value.value = null
    inputRef.value.click()
  }
}
const handleChange = (e) => {
  const files = e.target.files
  if (!files) return
  uploadFiles(files)
}
const uploadFiles = async (files) => {
  const file = files[0]
  let fileType = file.type
  // check img type
  const imgType = await getImageType(file, ['png', 'jpg', 'gif'])
  if (!imgType) {
    ElMessage.error('Image format incorrect, only png,jpg,gif allowed.')
    return
  }
  fileType = imgType
  // check source size
  if (file.size >= 1024 * 1024) {
    ElMessage.error('File oversize, maximum allowed:1MB')
    return
  }
  // check image width/height
  // const { width, height } = await getImageInfo(file)
  // console.log(width, 'width')
  // console.log(height, 'height')
  // if (width !== props.width || height !== props.height) {
  //   ElMessage.error(t('upload.message.imagePixelError', {
  //     allowWidth: props.width,
  //     allowHeight: props.height,
  //     width: width,
  //     height: height,
  //   }))
  // }
  uploadLoading.value = true
  const data = {
    file: file,
    type: fileType,
    // resize: props.sourceType === 'image',
    resize: false,
    s3: true,
  }
  try {
    const res = await uploadImage(data)
    const thisUrl = config.s3Url + res.S3_Url
    userInfo.value.avatar = thisUrl
    uploadLoading.value = false
  } catch (err) {
    uploadLoading.value = false
  }
}
const loading = ref(false)
const disabled = ref(false)

const usernameFailed = ref(false)
const emailFailed = ref(false)
const submit = () => {
  const { avatar, username, email, bio, walletAddress } = userInfo.value
  if (!username) {
    usernameFailed.value = true
    return
  }
  if (email && !validateEmail(email)) {
    emailFailed.value = true
    return
  }
  const params = {
    walletAddress,
    avatar,
    username,
    email,
    bio,
  }
  usernameFailed.value = false
  emailFailed.value = false
  updateFn(params)
}
const updateLoading = ref(false)
const updateFn = async (params) => {
  updateLoading.value = true
  await updateUser(params).catch(_ => {
    updateLoading.value = false
  })
  const userInfo = await getUser(params.walletAddress).catch(_ => {
    updateLoading.value = false
  })
  commonStore.setUserInfo(userInfo.data || null)
  updateLoading.value = false
  ElMessage.success('Update Success')
}

const handleLogout = async () => {
  if (window.walletInstance) {
    await window.walletInstance.disconnect()
  }
  if (['User', 'Medal', 'Game', 'Setting'].includes(route.name)) {
    window.location.href = '/'
  } else {
    window.location.reload()
  }
}

</script>
<style lang="scss" scoped >
// userinfo
.info {
  display: flex;
  flex-direction: column;

  .avatar {
    .a-page-title-small {
      margin-top: 0 !important;
    }

    .upload-input {
      display: none;
    }

    .imgUpload {
      display: flex;
      align-items: center;

      img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        object-fit: cover;
      }

      .chooseFile {
        margin-left: 15px;
      }
    }
  }

  .username {
    .id {
      font-size: 14px;
      font-style: normal;
      font-weight: normal;
      line-height: 17px;
      color: #5b6871;
      letter-spacing: .02em;
    }
  }

  .btnGroup {
    margin: 60px 0;

    .signOut {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 40px;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: normal;
      line-height: 17px;
      color: #5b6871;
      letter-spacing: .02em;
      cursor: pointer;
    }
  }
}

.header {
  .btnGroup {
    margin: 15px 0 !important;
  }
}
</style>
