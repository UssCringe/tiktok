import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'

import useAuthStore from '../store/authStore'
import { client } from "../utils/client"
import { SanityAssetDocument } from '@sanity/client'
import { createReadStream } from 'fs'

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>()
  const [wrongFileType, setWrongFileType] = useState(false)

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

    // uploading asset to sanity
    if (fileTypes.includes(selectedFile.type)) {
      console.log(selectedFile.type, selectedFile.name)
      
      client.assets
        .upload('file', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
          console.log("Upload failed: ", error)
        })

    } else {

    }
  };


  console.log(videoAsset)

  return (
    <div className='flex w-full h-full'>
      <div className='bg-white rounded-lg'>
        <div>
          <p className='text-2xl font-bold'>Upload Video</p>
          <p className='text-base text-gray-400 mt-1'>Post video to your account</p>
        </div>
        <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col 
        justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer
        hover:border-red-300 hover hover:bg-gray-100'>
          {isLoading ? (
            <p>Uploading...</p>
          ) : (
            <div>
              {videoAsset ? (
                <div>
                  <video
                  src={videoAsset.url}
                  loop
                  controls
                  className='rounded-cl h-[450px] mt-16 bg-black'
                  >
                  </video>
                </div>
              ) : (
                <label className='cursor-pointer'>

                  <div className='flex flex-col items-center justify-center h-full'>
                    <div className='flex flex-col items-center justify-center'>
                      <p className='font-bold text-xl'>
                        <FaCloudUploadAlt 
                        className='text-gray-300 text-6xl'
                        />
                      </p>
                      <p className='text-xl font-semibold'>
                        Upload Video
                      </p>
                    </div>
                    <p className='text-gray-400 text-center mt-10 text-sm leading-10'>
                      MP4 or WebM or ogg <br />
                      720x1280 or higher <br />
                      Up to 10 minutes <br />
                      Less than 2GB
                    </p>
                    <p className='bg-[#F51997] text-center mt-10 rounded
                     text-white font-medium p-2 w-52 outline-none'>
                      Select File
                    </p>
                  </div>
                  <input 
                  type="file"
                  name="upload-video"
                  onChange={(e) => uploadVideo(e)}
                  className="w-0 h-0"
                  />
                </label>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Upload
