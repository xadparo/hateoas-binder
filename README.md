# HATEOAS Parser

이 프로젝트는 "HATEOAS가 적용 된 Resource"를 파싱해주는 클라이언트용 라이브러리 입니다.  
HATEOAS는 개념적으로만 제안 되었으며, 표준규격이 존재하지 않지만 이 라이브러리에서는 이하에서 설명하는 전제를 따릅니다.

## HATEOAS 전제

1. REST API 에서 반환하는 Resource는 _links 프로퍼티를 가진다.
1. _links 객체는 자신의 링크(self)를 포함해야 한다.
1. 링크의 표현은 관계(rel), 주소(href), 동작(method)를 포함해야 한다.
1. 반환한 데이터 중 배열이 포함된 경우, templated 옵션을 지정 하는 것으로 rel, href의 format을 지정 할 수 있다.
1. format 지정 시 $ 는 응답 resource 그 자체를 명시한다. 배열의 인덱스는 format 표현에서 제외된다.
1. template 옵션이 지정 되었을 시, 파싱 후 _links에서 제거되며 지정된 배열 내 객체의 _links 를 추가 후, binding 된다.
