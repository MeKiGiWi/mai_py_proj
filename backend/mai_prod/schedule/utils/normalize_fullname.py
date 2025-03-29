def normalize_fullname(fullname: str) -> str:

    def process_part(part: str) -> str:
        return '-'.join(
            p.capitalize() 
            for p in part.split('-')
        )

    parts = [p.strip() for p in fullname.split() if p.strip()]
    
    normalized = [process_part(part) for part in parts]
    
    return ' '.join(normalized)