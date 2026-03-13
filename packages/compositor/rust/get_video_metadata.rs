extern crate ffmpeg_next as picusffmpeg;
use std::{
    fs::File,
    io::{BufReader, ErrorKind},
};

use crate::{
    errors::ErrorWithBacktrace,
    payloads::payloads::{KnownAudioCodecs, KnownCodecs, KnownColorSpaces, VideoMetadata},
};

// https://docs.rs/ffmpeg-next/6.0.0/src/metadata/metadata.rs.html#35
pub fn get_video_metadata(file_path: &str) -> Result<VideoMetadata, ErrorWithBacktrace> {
    // Initialize the FFmpeg library
    picusffmpeg::init().map_err(|e| e.to_string())?;

    // Open the input file
    let input = picusffmpeg::format::input(&file_path)?;

    // Find the video stream
    let video_stream = match input.streams().best(picusffmpeg::media::Type::Video) {
        Some(video_stream) => video_stream,
        None => Err(std::io::Error::new(
            ErrorKind::Other,
            format!(
                "No video stream found in {}. Is this a video file?",
                file_path
            ),
        ))?,
    };

    // Audio stream, only if has one

    let audio_stream = input.streams().best(picusffmpeg::media::Type::Audio);

    let video_codec_id = unsafe { (*(*(video_stream).as_ptr()).codecpar).codec_id };
    let color_space = unsafe { (*(*(video_stream).as_ptr()).codecpar).color_space };
    let audio_codec_id = match audio_stream {
        Some(audio_stream) => unsafe { (*(*(audio_stream).as_ptr()).codecpar).codec_id },
        None => picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_NONE,
    };

    let video_codec_name = match video_codec_id {
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_H264 => KnownCodecs::H264,
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_HEVC => KnownCodecs::H265,
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_VP8 => KnownCodecs::Vp8,
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_VP9 => KnownCodecs::Vp9,
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_AV1 => KnownCodecs::Av1,
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_PRORES => KnownCodecs::ProRes,
        _ => KnownCodecs::Unknown,
    };

    let audio_codec_name: Option<KnownAudioCodecs> = match audio_codec_id {
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_AAC => Some(KnownAudioCodecs::Aac),
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_OPUS => Some(KnownAudioCodecs::Opus),
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_MP3 => Some(KnownAudioCodecs::Mp3),
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_VORBIS => Some(KnownAudioCodecs::Vorbis),
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_PCM_F16LE => Some(KnownAudioCodecs::PcmF16Le),
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_PCM_F24LE => Some(KnownAudioCodecs::PcmF24Le),
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_PCM_F32BE => Some(KnownAudioCodecs::PcmF32be),
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_PCM_S16BE => Some(KnownAudioCodecs::PcmS16be),
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_PCM_S16LE => Some(KnownAudioCodecs::PcmS16le),
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_PCM_F32LE => Some(KnownAudioCodecs::PcmF32be),
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_PCM_F64BE => Some(KnownAudioCodecs::PcmF64be),
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_PCM_S24BE => Some(KnownAudioCodecs::PcmS24be),
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_PCM_S24LE => Some(KnownAudioCodecs::PcmS24le),
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_PCM_S32BE => Some(KnownAudioCodecs::PcmS32be),
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_PCM_S32LE => Some(KnownAudioCodecs::PcmS32le),
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_PCM_S64BE => Some(KnownAudioCodecs::PcmS64be),
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_PCM_S64LE => Some(KnownAudioCodecs::PcmS64le),
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_PCM_S8 => Some(KnownAudioCodecs::PcmS8),
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_PCM_U16BE => Some(KnownAudioCodecs::PcmU16be),
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_PCM_U16LE => Some(KnownAudioCodecs::PcmU16le),
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_PCM_U24BE => Some(KnownAudioCodecs::PcmU24be),
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_PCM_U8 => Some(KnownAudioCodecs::PcmU8),
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_PCM_U24LE => Some(KnownAudioCodecs::PcmS24le),
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_PCM_U32BE => Some(KnownAudioCodecs::PcmU32be),
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_PCM_U32LE => Some(KnownAudioCodecs::PcmU32le),
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_PCM_S16BE_PLANAR => {
            Some(KnownAudioCodecs::PcmS16bePlanar)
        }
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_PCM_S8_PLANAR => {
            Some(KnownAudioCodecs::PcmS8Planar)
        }
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_PCM_S24LE_PLANAR => {
            Some(KnownAudioCodecs::PcmS24lePlanar)
        }
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_PCM_S32LE_PLANAR => {
            Some(KnownAudioCodecs::PcmS32lePlanar)
        }
        picusffmpeg::ffi::AVCodecID::AV_CODEC_ID_NONE => None,
        _ => Some(KnownAudioCodecs::Unknown),
    };

    #[allow(non_snake_case)]
    let colorSpace = match color_space {
        picusffmpeg::ffi::AVColorSpace::AVCOL_SPC_BT2020_CL => KnownColorSpaces::BT2020CL,
        picusffmpeg::ffi::AVColorSpace::AVCOL_SPC_BT2020_NCL => KnownColorSpaces::BT2020NCL,
        picusffmpeg::ffi::AVColorSpace::AVCOL_SPC_BT470BG => KnownColorSpaces::BT470BG,
        picusffmpeg::ffi::AVColorSpace::AVCOL_SPC_BT709 => KnownColorSpaces::BT709,
        picusffmpeg::ffi::AVColorSpace::AVCOL_SPC_SMPTE170M => KnownColorSpaces::SMPTE170M,
        picusffmpeg::ffi::AVColorSpace::AVCOL_SPC_SMPTE240M => KnownColorSpaces::SMPTE240M,
        picusffmpeg::ffi::AVColorSpace::AVCOL_SPC_YCGCO => KnownColorSpaces::YCGCO,
        picusffmpeg::ffi::AVColorSpace::AVCOL_SPC_RGB => KnownColorSpaces::RGB,
        picusffmpeg::ffi::AVColorSpace::AVCOL_SPC_FCC => KnownColorSpaces::FCC,
        picusffmpeg::ffi::AVColorSpace::AVCOL_SPC_CHROMA_DERIVED_CL => {
            KnownColorSpaces::CHROMADERIVEDCL
        }
        picusffmpeg::ffi::AVColorSpace::AVCOL_SPC_CHROMA_DERIVED_NCL => {
            KnownColorSpaces::CHROMADERIVEDNCL
        }
        picusffmpeg::ffi::AVColorSpace::AVCOL_SPC_ICTCP => KnownColorSpaces::ICTCP,
        picusffmpeg::ffi::AVColorSpace::AVCOL_SPC_NB => KnownColorSpaces::Unknown,
        picusffmpeg::ffi::AVColorSpace::AVCOL_SPC_RESERVED => KnownColorSpaces::Unknown,
        picusffmpeg::ffi::AVColorSpace::AVCOL_SPC_SMPTE2085 => KnownColorSpaces::SMPTE2085,
        picusffmpeg::ffi::AVColorSpace::AVCOL_SPC_UNSPECIFIED => KnownColorSpaces::BT601,
        picusffmpeg::ffi::AVColorSpace::AVCOL_SPC_IPT_C2 => KnownColorSpaces::Unknown,
        picusffmpeg::ffi::AVColorSpace::AVCOL_SPC_YCGCO_RE => KnownColorSpaces::Unknown,
        picusffmpeg::ffi::AVColorSpace::AVCOL_SPC_YCGCO_RO => KnownColorSpaces::Unknown,
    };

    #[allow(non_snake_case)]
    let canPlayInVideoTag = match video_codec_name {
        KnownCodecs::H264 => true,
        KnownCodecs::H265 => true,
        KnownCodecs::Vp8 => true,
        KnownCodecs::Vp9 => true,
        KnownCodecs::Av1 => true,
        _ => false,
    };

    // Get the frame rate
    let fps = (video_stream.avg_frame_rate().numerator() as f32)
        / (video_stream.avg_frame_rate().denominator() as f32);

    // Get the codec
    let codec = picusffmpeg::codec::context::Context::from_parameters(video_stream.parameters())
        .map_err(|e| e.to_string())?;

    // Get the duration
    let duration = input.duration();
    #[allow(non_snake_case)]
    let durationInSeconds = match duration {
        i64::MIN => None,
        _ => Some(duration as f64 / picusffmpeg::ffi::AV_TIME_BASE as f64),
    };

    #[allow(non_snake_case)]
    let supportsSeeking = match video_codec_name {
        KnownCodecs::H264 => {
            if durationInSeconds.is_some() && durationInSeconds.unwrap() < 5.0 {
                true
            } else {
                let f = File::open(file_path).unwrap();
                let size = f.metadata()?.len();
                let reader = BufReader::new(f);

                let mp4 = mp4::Mp4Reader::read_header(reader, size);
                let supports_fast_start = match mp4 {
                    Ok(mp4) => mp4.supports_fast_start,
                    Err(_) => false,
                };
                supports_fast_start
            }
        }
        KnownCodecs::H265 => true,
        KnownCodecs::Vp8 => true,
        KnownCodecs::Vp9 => true,
        KnownCodecs::Av1 => true,
        KnownCodecs::ProRes => false,
        KnownCodecs::Unknown => false,
    };

    let audio_file_extension: Option<String> = match audio_codec_name {
        Some(KnownAudioCodecs::Opus) => Some("opus".to_string()),
        Some(KnownAudioCodecs::Aac) => Some("aac".to_string()),
        Some(KnownAudioCodecs::Mp3) => Some("mp3".to_string()),
        Some(KnownAudioCodecs::PcmF16Le) => Some("wav".to_string()),
        Some(KnownAudioCodecs::PcmF24Le) => Some("wav".to_string()),
        Some(KnownAudioCodecs::PcmF32be) => Some("wav".to_string()),
        Some(KnownAudioCodecs::PcmS16be) => Some("wav".to_string()),
        Some(KnownAudioCodecs::PcmS16le) => Some("wav".to_string()),
        Some(KnownAudioCodecs::PcmF32le) => Some("wav".to_string()),
        Some(KnownAudioCodecs::PcmF64be) => Some("wav".to_string()),
        Some(KnownAudioCodecs::PcmS24be) => Some("wav".to_string()),
        Some(KnownAudioCodecs::PcmS24le) => Some("wav".to_string()),
        Some(KnownAudioCodecs::PcmS32be) => Some("wav".to_string()),
        Some(KnownAudioCodecs::PcmS32le) => Some("wav".to_string()),
        Some(KnownAudioCodecs::PcmS64be) => Some("wav".to_string()),
        Some(KnownAudioCodecs::PcmS64le) => Some("wav".to_string()),
        Some(KnownAudioCodecs::PcmS8) => Some("wav".to_string()),
        Some(KnownAudioCodecs::PcmU16be) => Some("wav".to_string()),
        Some(KnownAudioCodecs::PcmU16le) => Some("wav".to_string()),
        Some(KnownAudioCodecs::PcmU24be) => Some("wav".to_string()),
        Some(KnownAudioCodecs::PcmU8) => Some("wav".to_string()),
        Some(KnownAudioCodecs::PcmU24le) => Some("wav".to_string()),
        Some(KnownAudioCodecs::PcmU32be) => Some("wav".to_string()),
        Some(KnownAudioCodecs::PcmU32le) => Some("wav".to_string()),
        Some(KnownAudioCodecs::PcmS16bePlanar) => Some("wav".to_string()),
        Some(KnownAudioCodecs::PcmS8Planar) => Some("wav".to_string()),
        Some(KnownAudioCodecs::PcmS24lePlanar) => Some("wav".to_string()),
        Some(KnownAudioCodecs::PcmS32lePlanar) => Some("wav".to_string()),
        Some(KnownAudioCodecs::Vorbis) => Some("ogg".to_string()),
        Some(KnownAudioCodecs::Unknown) => None,
        None => None,
    };

    if let Ok(video) = codec.decoder().video() {
        #[allow(non_snake_case)]
        let pixelFormat: Option<String> = match video.format() {
            picusffmpeg::format::Pixel::YUV420P => Some("yuv420p".to_string()),
            picusffmpeg::format::Pixel::YUYV422 => Some("yuyv422".to_string()),
            picusffmpeg::format::Pixel::RGB24 => Some("rgb24".to_string()),
            picusffmpeg::format::Pixel::BGR24 => Some("bgr24".to_string()),
            picusffmpeg::format::Pixel::YUV422P => Some("yuv422p".to_string()),
            picusffmpeg::format::Pixel::YUV444P => Some("yuv444p".to_string()),
            picusffmpeg::format::Pixel::YUV410P => Some("yuv410p".to_string()),
            picusffmpeg::format::Pixel::YUV411P => Some("yuv411p".to_string()),
            picusffmpeg::format::Pixel::YUVJ420P => Some("yuvj420p".to_string()),
            picusffmpeg::format::Pixel::YUVJ422P => Some("yuvj422p".to_string()),
            picusffmpeg::format::Pixel::YUVJ444P => Some("yuvj444p".to_string()),
            picusffmpeg::format::Pixel::ARGB => Some("argb".to_string()),
            picusffmpeg::format::Pixel::RGBA => Some("rgba".to_string()),
            picusffmpeg::format::Pixel::ABGR => Some("abgr".to_string()),
            picusffmpeg::format::Pixel::BGRA => Some("bgra".to_string()),
            picusffmpeg::format::Pixel::YUV440P => Some("yuv440p".to_string()),
            picusffmpeg::format::Pixel::YUVJ440P => Some("yuvj440p".to_string()),
            picusffmpeg::format::Pixel::YUVA420P => Some("yuva420p".to_string()),
            picusffmpeg::format::Pixel::YUV420P16LE => Some("yuv420p16le".to_string()),
            picusffmpeg::format::Pixel::YUV420P16BE => Some("yuv420p16be".to_string()),
            picusffmpeg::format::Pixel::YUV422P16LE => Some("yuv422p16le".to_string()),
            picusffmpeg::format::Pixel::YUV422P16BE => Some("yuv422p16be".to_string()),
            picusffmpeg::format::Pixel::YUV444P16LE => Some("yuv444p16le".to_string()),
            picusffmpeg::format::Pixel::YUV444P16BE => Some("yuv444p16be".to_string()),
            picusffmpeg::format::Pixel::YUV420P9BE => Some("yuv420p9be".to_string()),
            picusffmpeg::format::Pixel::YUV420P9LE => Some("yuv420p9le".to_string()),
            picusffmpeg::format::Pixel::YUV420P10BE => Some("yuv420p10be".to_string()),
            picusffmpeg::format::Pixel::YUV420P10LE => Some("yuv420p10le".to_string()),
            picusffmpeg::format::Pixel::YUV422P10BE => Some("yuv422p10be".to_string()),
            picusffmpeg::format::Pixel::YUV422P10LE => Some("yuv422p10le".to_string()),
            picusffmpeg::format::Pixel::YUV444P9BE => Some("yuv444p9be".to_string()),
            picusffmpeg::format::Pixel::YUV444P9LE => Some("yuv444p9le".to_string()),
            picusffmpeg::format::Pixel::YUV444P10BE => Some("yuv444p10be".to_string()),
            picusffmpeg::format::Pixel::YUV444P10LE => Some("yuv444p10le".to_string()),
            picusffmpeg::format::Pixel::YUV422P9BE => Some("yuv422p9be".to_string()),
            picusffmpeg::format::Pixel::YUV422P9LE => Some("yuv422p9le".to_string()),
            picusffmpeg::format::Pixel::YUVA420P9BE => Some("yuva420p9be".to_string()),
            picusffmpeg::format::Pixel::YUVA420P9LE => Some("yuva420p9le".to_string()),
            picusffmpeg::format::Pixel::YUVA422P9BE => Some("yuva422p9be".to_string()),
            picusffmpeg::format::Pixel::YUVA422P9LE => Some("yuva422p9le".to_string()),
            picusffmpeg::format::Pixel::YUVA444P9BE => Some("yuva444p9be".to_string()),
            picusffmpeg::format::Pixel::YUVA444P9LE => Some("yuva444p9le".to_string()),
            picusffmpeg::format::Pixel::YUVA420P10BE => Some("yuva420p10be".to_string()),
            picusffmpeg::format::Pixel::YUVA420P10LE => Some("yuva420p10le".to_string()),
            picusffmpeg::format::Pixel::YUVA422P10BE => Some("yuva422p10be".to_string()),
            picusffmpeg::format::Pixel::YUVA422P10LE => Some("yuva422p10le".to_string()),
            picusffmpeg::format::Pixel::YUVA444P10BE => Some("yuva444p10be".to_string()),
            picusffmpeg::format::Pixel::YUVA444P10LE => Some("yuva444p10le".to_string()),
            picusffmpeg::format::Pixel::YUVA420P16BE => Some("yuva420p16be".to_string()),
            picusffmpeg::format::Pixel::YUVA420P16LE => Some("yuva420p16le".to_string()),
            picusffmpeg::format::Pixel::YUVA422P16BE => Some("yuva422p16be".to_string()),
            picusffmpeg::format::Pixel::YUVA422P16LE => Some("yuva422p16le".to_string()),
            picusffmpeg::format::Pixel::YUVA444P16BE => Some("yuva444p16be".to_string()),
            picusffmpeg::format::Pixel::YUVA444P16LE => Some("yuva444p16le".to_string()),
            picusffmpeg::format::Pixel::YUVA444P => Some("yuva444p".to_string()),
            picusffmpeg::format::Pixel::YUVA422P => Some("yuva422p".to_string()),
            picusffmpeg::format::Pixel::YUV420P12BE => Some("yuv420p12be".to_string()),
            picusffmpeg::format::Pixel::YUV420P12LE => Some("yuv420p12le".to_string()),
            picusffmpeg::format::Pixel::YUV420P14BE => Some("yuv420p14be".to_string()),
            picusffmpeg::format::Pixel::YUV420P14LE => Some("yuv420p14le".to_string()),
            picusffmpeg::format::Pixel::YUV422P12BE => Some("yuv422p12be".to_string()),
            picusffmpeg::format::Pixel::YUV422P12LE => Some("yuv422p12le".to_string()),
            picusffmpeg::format::Pixel::YUV422P14BE => Some("yuv422p14be".to_string()),
            picusffmpeg::format::Pixel::YUV422P14LE => Some("yuv422p14le".to_string()),
            picusffmpeg::format::Pixel::YUV444P12BE => Some("yuv444p12be".to_string()),
            picusffmpeg::format::Pixel::YUV444P12LE => Some("yuv444p12le".to_string()),
            picusffmpeg::format::Pixel::YUV444P14BE => Some("yuv444p14be".to_string()),
            picusffmpeg::format::Pixel::YUV444P14LE => Some("yuv444p14le".to_string()),
            picusffmpeg::format::Pixel::YUVJ411P => Some("yuvj411p".to_string()),
            picusffmpeg::format::Pixel::YUV440P10LE => Some("yuv440p10le".to_string()),
            picusffmpeg::format::Pixel::YUV440P10BE => Some("yuv440p10be".to_string()),
            picusffmpeg::format::Pixel::YUV440P12LE => Some("yuv440p12le".to_string()),
            picusffmpeg::format::Pixel::YUV440P12BE => Some("yuv440p12be".to_string()),
            picusffmpeg::format::Pixel::YUV420P9 => Some("yuv420p9".to_string()),
            picusffmpeg::format::Pixel::YUV422P9 => Some("yuv422p9".to_string()),
            picusffmpeg::format::Pixel::YUV444P9 => Some("yuv444p9".to_string()),
            picusffmpeg::format::Pixel::YUV420P10 => Some("yuv420p10".to_string()),
            picusffmpeg::format::Pixel::YUV422P10 => Some("yuv422p10".to_string()),
            picusffmpeg::format::Pixel::YUV440P10 => Some("yuv440p10".to_string()),
            picusffmpeg::format::Pixel::YUV444P10 => Some("yuv444p10".to_string()),
            picusffmpeg::format::Pixel::YUV420P12 => Some("yuv420p12".to_string()),
            picusffmpeg::format::Pixel::YUV422P12 => Some("yuv422p12".to_string()),
            picusffmpeg::format::Pixel::YUV440P12 => Some("yuv440p12".to_string()),
            picusffmpeg::format::Pixel::YUV444P12 => Some("yuv444p12".to_string()),
            picusffmpeg::format::Pixel::YUV420P14 => Some("yuv420p14".to_string()),
            picusffmpeg::format::Pixel::YUV422P14 => Some("yuv422p14".to_string()),
            picusffmpeg::format::Pixel::YUV444P14 => Some("yuv444p14".to_string()),
            picusffmpeg::format::Pixel::YUV420P16 => Some("yuv420p16".to_string()),
            picusffmpeg::format::Pixel::YUV422P16 => Some("yuv422p16".to_string()),
            picusffmpeg::format::Pixel::YUV444P16 => Some("yuv444p16".to_string()),
            picusffmpeg::format::Pixel::YUVA420P9 => Some("yuva420p9".to_string()),
            picusffmpeg::format::Pixel::YUVA422P9 => Some("yuva422p9".to_string()),
            picusffmpeg::format::Pixel::YUVA444P9 => Some("yuva444p9".to_string()),
            picusffmpeg::format::Pixel::YUVA420P10 => Some("yuva420p10".to_string()),
            picusffmpeg::format::Pixel::YUVA422P10 => Some("yuva422p10".to_string()),
            picusffmpeg::format::Pixel::YUVA444P10 => Some("yuva444p10".to_string()),
            picusffmpeg::format::Pixel::YUVA420P16 => Some("yuva420p16".to_string()),
            picusffmpeg::format::Pixel::YUVA422P16 => Some("yuva422p16".to_string()),
            picusffmpeg::format::Pixel::YUVA444P16 => Some("yuva444p16".to_string()),
            picusffmpeg::format::Pixel::YUVA422P12BE => Some("yuva422p12be".to_string()),
            picusffmpeg::format::Pixel::YUVA422P12LE => Some("yuva422p12le".to_string()),
            picusffmpeg::format::Pixel::YUVA444P12BE => Some("yuva444p12be".to_string()),
            picusffmpeg::format::Pixel::YUVA444P12LE => Some("yuva444p12le".to_string()),
            picusffmpeg::format::Pixel::None => None,
            _ => Some("unknown".to_string()),
        };

        // Return the video metadata
        let metadata = VideoMetadata {
            fps,
            width: video.width(),
            height: video.height(),
            durationInSeconds,
            codec: video_codec_name,
            canPlayInVideoTag,
            supportsSeeking,
            colorSpace,
            audioCodec: audio_codec_name,
            audioFileExtension: audio_file_extension,
            pixelFormat,
        };
        Ok(metadata)
    } else {
        return Err(std::io::Error::new(
            ErrorKind::Other,
            "The codec is not a video codec",
        ))?;
    }
}
