import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useClassContext } from '../ClassContext';
import style from '../styles/DiscussionPage.module.scss';

const ClassDiscussion: React.FC = () => {
  const { classCode } = useParams(); 
  const { classList } = useClassContext(); 
  const currentClass = classList.find(cls => cls.subject === classCode); 

  const [discussion, setDiscussion] = useState('');
  const [discussionList, setDiscussionList] = useState<string[]>([]);

  const handlePost = () => {
    if (discussion.trim()) {
      setDiscussionList(prev => [...prev, discussion.trim()]);
      setDiscussion('');
    }
  };

  if (!currentClass) {
    return <div className={style.notFound}>Class not found</div>;
  }

  return (
    <div className={style.discussionContainer}>
      <h1 className={style.heading}>Discussion for {currentClass.subject}</h1>
      <p><strong>Venue:</strong> {currentClass.location}</p>
      <p><strong>Timing:</strong> {currentClass.startTime} - {currentClass.endTime}</p>

      <div className={style.inputSection}>
        <textarea
          value={discussion}
          onChange={(e) => setDiscussion(e.target.value)}
          placeholder="Type what was taught in class..."
          className={style.textarea}
        />
        <button onClick={handlePost} className={style.postButton}>Post</button>
      </div>

      <div className={style.discussionList}>
        <h3>Posts</h3>
        {discussionList.length === 0 ? (
          <p className={style.noPosts}>No discussions yet.</p>
        ) : (
          discussionList.map((post, idx) => (
            <div key={idx} className={style.postItem}>
              {post}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClassDiscussion;
