import PrevButton from "../../components/PrevButton";
import TitleHeader from "../../components/TitleHeader";
import ValueSettingButton from "../../components/ValueSettingButton";
import EnrollWrapper from "../../components/WritingPage/EnrollWrapper";
import WritingEditor from "../../components/WritingPage/WritingEditor";
import { useState, useEffect } from "react";
import QuestionTitle from "./QuestionTitle";
import { useThrottle } from "../../hooks/useThrottle";
import useWritingSubmit from "../../hooks/useWritingSubmit";
import type { DiaryUploadRequestDTO } from "../../utils/types/diary";

const WritingPage = () => {
  const _title_free = "자유글";
  const _title_question = "질문글";
  const [form, setForm] = useState<DiaryUploadRequestDTO>({
    title: "",
    content: "",
    style: "FREE",
    visibility: "PRIVATE",
    commentPermission: "FRIEND",
    language: "en",
    thumbImg: "",
  });
  const { data, isPending, isError, submitWriting } = useWritingSubmit<{
    id: string;
  }>();

  // 글쓰기 페이지에서 사용할 제목 상태
  const [_titleValue, setTitleValue] = useState<string>(_title_free);

  //제목 이름 상태 관리
  const [_titleName, setTitleName] = useState<string>("");
  const _ThrottledTitleName = useThrottle(_titleName, 500);
  //디버깅 용임. 나중에 배포할 땐 지우기
  useEffect(() => {
    console.log("Throttled Title Name: ", _ThrottledTitleName);
  }, [_ThrottledTitleName]);

  // 에디터 내용 변경을 반영하는하기 위함
  //useThrottle을 통해서 내용이 바뀐 뒤 1500ms 후에 _throttledEditorContent가 업데이트됨
  const [_editorRawContent, setEditorRawContent] = useState<string>("");
  const _throttledEditorContent = useThrottle(_editorRawContent, 1500);
  //디버깅 용임. 나중에 배포할 땐 지우기
  useEffect(() => {
    console.log("Throttled Editor Content: ", _throttledEditorContent);
  }, [_throttledEditorContent]);
  const handleEditorChange = (value: string) => {
    setEditorRawContent(value);
  };

  //--------------------------------------------//
  //제목 변경을 반영하는 함수
  const handleTitleValueChange = (value: string) => {
    if (value === _title_free) {
      setTitleName(""); // 자유글 선택 시 제목 초기화
      setTitleValue(_title_free);
    } else {
      setTitleValue(_title_question);
    }
    return value;
  };
  const _handleRefresh = () => {
    //질문글 재생성
    console.log("질문글 재생성");
  };

  useEffect(() => {
    console.log(_titleValue);
  }, [_titleValue]);

  //API submit handler
  //1. title내용을 저장
  //2. enrollmodal에서 handlesubmit이 작동했을 때 여기에서 공개설정/댓글설정 한 내용 불러오기
  //3. 공개/댓글 설정을 불러오면 해당 내용과 함께 title, content, style(자유글/질문글), visibility(공개설정), commentPermission(댓글설정), language(유저 정보에서 빼와야할듯?), thumbImg를 첨부하여 전송해야 함.
  //음... 내 생각엔 먼저 editor내용을 불러오고
  // 마지막에 handlesubmit을 할 때 enrollModal에서 설정한 내용들을 불러와서
  //enrollModal에서 API내용을 전달하는 것이 제일 나은 방법인 것 같음.
  const _handleSubmit = () => {
    submitWriting(form);
  };

  return (
    <div className="px-4 py-2 bg-gray-100">
      <div className="flex items-center gap-x-6 ">
        <PrevButton navigateURL="/mydiary" />
        <TitleHeader title="글쓰기" />
        <div className="ml-auto mr-6">
          <EnrollWrapper />
        </div>
      </div>
      <div className=" flex flex-col items-start p-5 gap-[15px] self-stretch w-full">
        {/*자유글 / 질문글 구분 영역*/}
        <div className="bg-white rounded-[12px] shadow-[0px_4px_10px_rgba(0,0,0,0.1)] mt-5 w-full p-5 gap-3">
          <ValueSettingButton
            title1={_title_free}
            title2={_title_question}
            onClick={handleTitleValueChange}
          />
          {_titleValue === "자유글" && (
            <input
              onChange={(e) => setTitleName(e.target.value)}
              type="text"
              className="w-full bg-gray-200 rounded-md p-3 mt-5"
              placeholder="제목을 입력하세요."
            ></input>
          )}
          {_titleValue === "질문글" && (
            <QuestionTitle onClick={_handleRefresh} />
          )}
        </div>

        <div className="w-full h-full mt-5 ">
          {/*글쓰기 영역*/}
          <WritingEditor
            value={_editorRawContent}
            onChange={handleEditorChange}
          />
        </div>
      </div>
    </div>
  );
};

export default WritingPage;
